export function parseTimeRange(range?: string): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  let startDate: Date;

  switch (range) {
    case '1h':
      startDate = new Date(endDate.getTime() - 60 * 60 * 1000);
      break;
    case '24h':
      startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      // Default to last 24 hours
      startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  }

  return { startDate, endDate };
}
