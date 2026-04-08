/**
 * Garanti BBVA 3D Secure POS Integration
 *
 * Flow:
 * 1. initiate3DSecure() → sends enrollment request to Garanti
 * 2. Garanti returns HTML form → user redirected to bank 3D page
 * 3. Bank POSTs result to our callback URL
 * 4. complete3DSecure() → finalizes the payment with Garanti
 */

import { createHash } from "crypto";

const MERCHANT_ID = process.env.GARANTI_MERCHANT_ID!;
const TERMINAL_ID = process.env.GARANTI_TERMINAL_ID!;
const PROVAUT_USER = process.env.GARANTI_PROVAUT_USER || "PROVAUT";
const PROVAUT_PASSWORD = process.env.GARANTI_PROVAUT_PASSWORD!;
const STORE_KEY = process.env.GARANTI_STORE_KEY!;
const SUCCESS_URL = process.env.GARANTI_SUCCESS_URL!;
const ERROR_URL = process.env.GARANTI_ERROR_URL!;

const GARANTI_3D_URL = "https://sanalposprov.garanti.com.tr/servlet/gt3dengine";
const GARANTI_PROV_URL = "https://sanalposprov.garanti.com.tr/VPServlet";

function sha1(data: string): string {
  return createHash("sha1").update(data, "latin1").digest("hex").toUpperCase();
}

function sha512(data: string): string {
  return createHash("sha512").update(data, "latin1").digest("hex").toUpperCase();
}

function generateOrderId(): string {
  const now = new Date();
  const ts = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SA${ts}${rand}`;
}

/**
 * Step 1: Generate the 3D Secure enrollment form data.
 */
export function initiate3DSecure(params: {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  amount: number;
  email: string;
  ip: string;
  tenantId: string;
}) {
  const orderId = generateOrderId();
  const amountStr = params.amount.toString();
  const paddedTerminalId = TERMINAL_ID.padStart(9, "0");

  // Stage 1: SecurityData = SHA1(password + paddedTerminalId)
  const securityData = sha1(PROVAUT_PASSWORD + paddedTerminalId);

  // Stage 2: secure3dhash = SHA512(paddedTerminalId + orderId + amount + currencyCode + successUrl + errorUrl + txnType + installmentCount + storeKey + securityData)
  const hashStr = [
    paddedTerminalId,
    orderId,
    amountStr,
    "949",        // currencyCode TRY
    SUCCESS_URL,
    ERROR_URL,
    "sales",      // txnType
    "",           // installmentCount (empty = tek cekim)
    STORE_KEY,
    securityData,
  ].join("");

  const secureHash = sha512(hashStr);

  return {
    action: GARANTI_3D_URL,
    fields: {
      mode: "PROD",
      apiversion: "512",
      terminalprovuserid: PROVAUT_USER,
      terminaluserid: PROVAUT_USER,
      terminalmerchantid: MERCHANT_ID,
      terminalid: paddedTerminalId,
      txntype: "sales",
      txnamount: amountStr,
      txncurrencycode: "949",
      txninstallmentcount: "",
      orderid: orderId,
      successurl: SUCCESS_URL,
      errorurl: ERROR_URL,
      customeremailaddress: params.email,
      customeripaddress: params.ip,
      secure3dsecuritylevel: "3D",
      cardnumber: params.cardNumber,
      cardexpiredatemonth: params.expMonth.padStart(2, "0"),
      cardexpiredateyear: params.expYear,
      cardcvv2: params.cvv,
      secure3dhash: secureHash,
      refreshtime: "0",
    },
    orderId,
    tenantId: params.tenantId,
  };
}

/**
 * Step 2: After 3D verification, complete the payment via Garanti XML API.
 */
export async function complete3DSecure(callbackParams: {
  mdstatus: string;
  md: string;
  cavv: string;
  eci: string;
  xid: string;
  orderid: string;
  amount: string;
  customeripaddress: string;
}): Promise<{ success: boolean; message: string; details?: string }> {
  const { mdstatus, md, cavv, eci, xid, orderid, amount, customeripaddress } = callbackParams;

  if (mdstatus !== "1") {
    return {
      success: false,
      message: mdstatus === "2" ? "Kart sahibi veya bankası sisteme kayıtlı değil."
        : mdstatus === "3" ? "Kart sahibi veya bankası sisteme kayıtlı değil."
        : mdstatus === "4" ? "Doğrulama denemesi."
        : mdstatus === "5" ? "Doğrulama yapılamıyor."
        : mdstatus === "7" ? "Sistem hatası."
        : mdstatus === "8" ? "Bilinmeyen kart no."
        : "3D Secure doğrulaması başarısız.",
    };
  }

  const paddedTerminalId = TERMINAL_ID.padStart(9, "0");

  // Provision hash: SHA512(orderId + paddedTerminalId + amount + securityData)
  const securityData = sha1(PROVAUT_PASSWORD + paddedTerminalId);
  const provHashStr = [orderid, paddedTerminalId, amount, securityData].join("");
  const provHash = sha512(provHashStr);

  // Also compute SHA1 hash as fallback (some terminals use v0.01)
  const provHashV1 = sha1(provHashStr);

  // Try SHA512 first (Version 512)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<GVPSRequest>
  <Mode>PROD</Mode>
  <Version>512</Version>
  <Terminal>
    <ProvUserID>${PROVAUT_USER}</ProvUserID>
    <HashData>${provHash}</HashData>
    <UserID>${PROVAUT_USER}</UserID>
    <ID>${TERMINAL_ID}</ID>
    <MerchantID>${MERCHANT_ID}</MerchantID>
  </Terminal>
  <Customer>
    <IPAddress>${customeripaddress}</IPAddress>
    <EmailAddress></EmailAddress>
  </Customer>
  <Card>
    <Number></Number>
    <ExpireDate></ExpireDate>
    <CVV2></CVV2>
  </Card>
  <Order>
    <OrderID>${orderid}</OrderID>
  </Order>
  <Transaction>
    <Type>sales</Type>
    <InstallmentCnt></InstallmentCnt>
    <Amount>${amount}</Amount>
    <CurrencyCode>949</CurrencyCode>
    <CardholderPresentCode>13</CardholderPresentCode>
    <MotoInd>N</MotoInd>
    <Secure3D>
      <AuthenticationCode>${cavv}</AuthenticationCode>
      <SecurityLevel>${eci}</SecurityLevel>
      <TxnID>${xid}</TxnID>
      <Md>${md}</Md>
    </Secure3D>
  </Transaction>
</GVPSRequest>`;

  try {
    const response = await fetch(GARANTI_PROV_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `data=${encodeURIComponent(xml)}`,
    });

    const responseText = await response.text();
    console.log("[garanti-prov] response:", responseText.slice(0, 500));

    const reasonCodeMatch = responseText.match(/<ReasonCode>(\d+)<\/ReasonCode>/);
    const messageMatch = responseText.match(/<ErrorMsg>([^<]*)<\/ErrorMsg>/);
    const sysErrMatch = responseText.match(/<SysErrMsg>([^<]*)<\/SysErrMsg>/);
    const reasonCode = reasonCodeMatch ? reasonCodeMatch[1] : "99";
    const errorMsg = messageMatch ? messageMatch[1] : "Bilinmeyen hata";
    const sysErr = sysErrMatch ? sysErrMatch[1] : "";

    if (reasonCode === "00") {
      return { success: true, message: "Ödeme başarıyla tamamlandı." };
    } else {
      // If SHA512 fails with password error, retry with v0.01 + SHA1
      if (errorMsg.toLowerCase().includes("şifre") || errorMsg.toLowerCase().includes("sifre") || reasonCode === "99") {
        console.log("[garanti-prov] SHA512 failed, retrying with v0.01 + SHA1...");
        const xmlV1 = xml.replace("<Version>512</Version>", "<Version>v0.01</Version>")
                         .replace(`<HashData>${provHash}</HashData>`, `<HashData>${provHashV1}</HashData>`);

        const resp2 = await fetch(GARANTI_PROV_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `data=${encodeURIComponent(xmlV1)}`,
        });
        const resp2Text = await resp2.text();
        console.log("[garanti-prov] v0.01 response:", resp2Text.slice(0, 500));

        const rc2 = resp2Text.match(/<ReasonCode>(\d+)<\/ReasonCode>/);
        const em2 = resp2Text.match(/<ErrorMsg>([^<]*)<\/ErrorMsg>/);
        const se2 = resp2Text.match(/<SysErrMsg>([^<]*)<\/SysErrMsg>/);
        if (rc2 && rc2[1] === "00") {
          return { success: true, message: "Ödeme başarıyla tamamlandı." };
        }
        return {
          success: false,
          message: `Ödeme başarısız: ${em2?.[1] || errorMsg}`,
          details: `RC=${rc2?.[1] || reasonCode} SysErr=${se2?.[1] || sysErr}`,
        };
      }

      return {
        success: false,
        message: `Ödeme başarısız: ${errorMsg}`,
        details: `RC=${reasonCode} SysErr=${sysErr}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Banka ile iletişim kurulamadı. Lütfen tekrar deneyin.",
      details: String(error),
    };
  }
}
