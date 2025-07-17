export default function computeIncrements(existing, findCoin) {
  const now = new Date();
  const elapsedMs = now - existing.lastUpdated || existing.startTime;
  const elapsedMinutes = elapsedMs / (1000 * 60);

  const mined = elapsedMinutes * (findCoin.ratePerMinute || 0);
  const priceInc = mined * (findCoin.currentPrice || 0);

  return { mined, priceInc, now };
}
