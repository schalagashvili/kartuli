export function formatCurrency(amount: number): string {
  return `₾${amount.toFixed(2)}`;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}მ`;
  }
  return `${km.toFixed(1)}კმ`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}წთ`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}სთ ${mins}წთ`;
}
