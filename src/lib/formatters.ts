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

export function formatCUIL(value: string): string {
  let digits = value.replace(/\D/g, "");

  // Limita a 11 dígitos
  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  // Aplica formato solo si están los 11 dígitos
  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{8})(\d{1})$/, "$1-$2-$3");
  }

  // Si todavía no hay 11 dígitos, se devuelve sin formatear
  return digits;
}