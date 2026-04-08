/**
 * TCMB Döviz Kuru — USD/TRY satış kuru
 * Kaynak: TCMB günlük kur XML
 */

let cachedRate: { rate: number; fetchedAt: number } | null = null;
const CACHE_TTL = 3600_000; // 1 saat

export async function getUsdTryRate(): Promise<number> {
  // Return cached if fresh
  if (cachedRate && Date.now() - cachedRate.fetchedAt < CACHE_TTL) {
    return cachedRate.rate;
  }

  try {
    const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", {
      headers: { "Accept": "application/xml" },
      next: { revalidate: 3600 },
    });
    const xml = await res.text();

    // Parse USD selling rate from XML
    // <Currency CurrencyCode="USD">...<ForexSelling>XX.XXXX</ForexSelling>...
    const usdBlock = xml.match(/<Currency[^>]*CurrencyCode="USD"[^>]*>[\s\S]*?<\/Currency>/);
    if (!usdBlock) throw new Error("USD block not found in TCMB XML");

    const sellingMatch = usdBlock[0].match(/<ForexSelling>([\d.]+)<\/ForexSelling>/);
    if (!sellingMatch) throw new Error("ForexSelling not found");

    const rate = parseFloat(sellingMatch[1]);
    if (isNaN(rate) || rate < 1) throw new Error(`Invalid rate: ${rate}`);

    cachedRate = { rate, fetchedAt: Date.now() };
    console.log(`[tcmb] USD/TRY selling rate: ${rate}`);
    return rate;
  } catch (error) {
    console.error("[tcmb] Failed to fetch rate:", error);
    // Fallback: use last cached rate or a safe default
    if (cachedRate) return cachedRate.rate;
    return 38.5; // safe fallback — update if needed
  }
}
