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
const SUCCESS_URL = process.env.GARANTI_SUCCESS_URL!;  // https://superajan.com/api/odeme/callback
const ERROR_URL = process.env.GARANTI_ERROR_URL!;      // https://superajan.com/api/odeme/callback

// Garanti endpoints
const GARANTI_3D_URL = "https://sanalposprov.garanti.com.tr/servlet/gt3dengine";
const GARANTI_PROV_URL = "https://sanalposprov.garanti.com.tr/VPServlet";

// Test endpoints (use these during development)
// const GARANTI_3D_URL = "https://sanalposprovtest.garanti.com.tr/servlet/gt3dengine";
// const GARANTI_PROV_URL = "https://sanalposprovtest.garanti.com.tr/VPServlet";

function sha1(data: string): string {
  return createHash("sha1").update(data, "utf-8").digest("hex");
}

function generateOrderId(): string {
  const now = new Date();
  const ts = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SA${ts}${rand}`;
}

/**
 * Step 1: Generate the 3D Secure enrollment form data.
 * Frontend renders a hidden form and auto-submits to Garanti's 3D page.
 */
export function initiate3DSecure(params: {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  amount: number; // in TRY kuruş (e.g. 120000 for 1200.00 TRY)
  email: string;
  ip: string;
  tenantId: string;
}) {
  const orderId = generateOrderId();
  const amountStr = params.amount.toString(); // kuruş cinsinden

  // Security hash for 3D: SHA1(TERMINAL_ID + ORDER_ID + AMOUNT + SUCCESS_URL + ERROR_URL + "sales" + "" + STORE_KEY)
  const hashData = `${TERMINAL_ID}${orderId}${amountStr}${SUCCESS_URL}${ERROR_URL}sales${STORE_KEY}`;
  const secureHash = sha1(hashData).toUpperCase();

  return {
    action: GARANTI_3D_URL,
    fields: {
      mode: "PROD",
      apiversion: "v1.0",
      terminalprovuserid: PROVAUT_USER,
      terminaluserid: PROVAUT_USER,
      terminalmerchantid: MERCHANT_ID,
      terminalid: TERMINAL_ID.padStart(9, "0"),
      txntype: "sales",
      txnamount: amountStr,
      txncurrencycode: "949", // TRY
      txninstallmentcount: "", // tek çekim
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
      // Custom fields to identify payment on callback
      refreshtime: "0",
    },
    orderId,
    tenantId: params.tenantId,
  };
}

/**
 * Step 2: After 3D verification, complete the payment via Garanti XML API.
 * Called from the callback handler after receiving bank's response.
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

  // mdstatus must be 1 (fully authenticated) for 3D Secure
  if (mdstatus !== "1") {
    return {
      success: false,
      message: mdstatus === "2" ? "Kart sahibi veya bankası sisteme kayıtlı değil."
        : mdstatus === "3" ? "Kart sahibi veya bankası sisteme kayıtlı değil."
        : mdstatus === "4" ? "Doğrulama denemesi, kart sahibi sisteme daha sonra kaydolmayı seçmiş."
        : mdstatus === "5" ? "Doğrulama yapılamıyor."
        : mdstatus === "7" ? "Sistem hatası."
        : mdstatus === "8" ? "Bilinmeyen kart no."
        : "3D Secure doğrulaması başarısız.",
    };
  }

  // Generate provision password hash: SHA1(PASSWORD + TERMINAL_ID_PADDED)
  const hashedPassword = sha1(PROVAUT_PASSWORD + TERMINAL_ID.padStart(9, "0")).toUpperCase();

  // Generate transaction hash: SHA1(ORDER_ID + TERMINAL_ID + CARD_NUMBER + AMOUNT + HASHED_PASSWORD)
  // For 3D completion, card number is empty
  const hashData = `${orderid}${TERMINAL_ID}${amount}${hashedPassword}`;
  const hash = sha1(hashData).toUpperCase();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<GVPSRequest>
  <Mode>PROD</Mode>
  <Version>v0.01</Version>
  <Terminal>
    <ProvUserID>${PROVAUT_USER}</ProvUserID>
    <HashData>${hash}</HashData>
    <UserID>${PROVAUT_USER}</UserID>
    <ID>${TERMINAL_ID.padStart(9, "0")}</ID>
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

    // Parse XML response
    const reasonCodeMatch = responseText.match(/<ReasonCode>(\d+)<\/ReasonCode>/);
    const messageMatch = responseText.match(/<ErrorMsg>([^<]*)<\/ErrorMsg>/);
    const reasonCode = reasonCodeMatch ? reasonCodeMatch[1] : "99";
    const errorMsg = messageMatch ? messageMatch[1] : "Bilinmeyen hata";

    if (reasonCode === "00") {
      return { success: true, message: "Ödeme başarıyla tamamlandı." };
    } else {
      return {
        success: false,
        message: `Ödeme başarısız: ${errorMsg}`,
        details: `ReasonCode: ${reasonCode}`,
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
