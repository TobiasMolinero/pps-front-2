export const formatMoney = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));

  if (!isNaN(numberValue)) {
    return value = parseMoney(numberValue);
  } else {
    return value = '';
  }
};

const parseMoney = (value: number) => {
  let formatValue: string = (value / 100).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return formatValue;
};

// Convierte string con formato monetario a número limpio
export function cleanFormatMoney(value: string): number {
  const numeric = Number(
    value.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.')
  )
  return isNaN(numeric) ? 0 : numeric
}

export function formatDNI(value: string): string {
  return value
    .replace(/\D/g, '')         // solo números
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // 12345678 → 12.345.678
}