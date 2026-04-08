import { NextResponse } from "next/server";
import { createHash } from "crypto";

function sha1(data: string): string {
  return createHash("sha1").update(data, "latin1").digest("hex").toUpperCase();
}

function sha512(data: string): string {
  return createHash("sha512").update(data, "latin1").digest("hex").toUpperCase();
}

export async function GET() {
  const TERMINAL_ID = process.env.GARANTI_TERMINAL_ID || "MISSING";
  const MERCHANT_ID = process.env.GARANTI_MERCHANT_ID || "MISSING";
  const PROVAUT_PASSWORD = process.env.GARANTI_PROVAUT_PASSWORD || "MISSING";
  const STORE_KEY = process.env.GARANTI_STORE_KEY || "MISSING";
  const SUCCESS_URL = process.env.GARANTI_SUCCESS_URL || "MISSING";
  const ERROR_URL = process.env.GARANTI_ERROR_URL || "MISSING";

  const paddedTerminalId = TERMINAL_ID.padStart(9, "0");
  const securityData = sha1(PROVAUT_PASSWORD + paddedTerminalId);

  const testOrderId = "TEST123";
  const testAmount = "100";

  const hashStr = [
    paddedTerminalId,
    testOrderId,
    testAmount,
    "949",
    SUCCESS_URL,
    ERROR_URL,
    "sales",
    "",
    STORE_KEY,
    securityData,
  ].join("");

  const secureHash = sha512(hashStr);

  return NextResponse.json({
    env: {
      TERMINAL_ID,
      MERCHANT_ID,
      PROVAUT_PASSWORD: PROVAUT_PASSWORD.slice(0, 3) + "***",
      STORE_KEY_length: STORE_KEY.length,
      STORE_KEY_first8: STORE_KEY.slice(0, 8),
      SUCCESS_URL,
      ERROR_URL,
    },
    hash_debug: {
      paddedTerminalId,
      securityData,
      hashInput_preview: hashStr.slice(0, 100) + "...",
      hashInput_length: hashStr.length,
      secureHash_first20: secureHash.slice(0, 20),
      algorithm: "SHA512",
      apiversion: "512",
    },
  });
}
