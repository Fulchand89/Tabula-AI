/**
 * Date formatting utilities for inputs.
 * Ensures dates are entered and displayed in DD/MM/YYYY format (e.g. 12/05/2002).
 */

/**
 * Automatically formats digits and slashes into DD/MM/YYYY format as the user types.
 * Prevents inputting raw strings like "1111111111111111" by capping at 8 digits (10 chars with slashes)
 * and auto-inserting slashes at day and month boundaries.
 *
 * @param {string} value Raw input value
 * @returns {string} Formatted DD/MM/YYYY date
 */
export function formatDateInput(value) {
  if (!value) return '';

  const rawDigits = value.replace(/\D/g, '').slice(0, 8);
  if (!rawDigits) return '';

  if (rawDigits.length <= 2) {
    if (value.endsWith('/') && rawDigits.length >= 1) {
      return (rawDigits.length === 1 ? '0' + rawDigits : rawDigits) + '/';
    }
    return rawDigits;
  }

  if (rawDigits.length <= 4) {
    const d = rawDigits.slice(0, 2);
    const m = rawDigits.slice(2);
    if (value.endsWith('/') && m.length >= 1) {
      return d + '/' + (m.length === 1 ? '0' + m : m) + '/';
    }
    return d + '/' + m;
  }

  return `${rawDigits.slice(0, 2)}/${rawDigits.slice(2, 4)}/${rawDigits.slice(4, 8)}`;
}

/**
 * Converts ISO format "YYYY-MM-DD" to "DD/MM/YYYY".
 *
 * @param {string} isoString e.g. "2002-05-12"
 * @returns {string} e.g. "12/05/2002"
 */
export function isoToDisplayDate(isoString) {
  if (!isoString) return '';
  const parts = isoString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }
  return isoString;
}

/**
 * Converts "DD/MM/YYYY" to ISO "YYYY-MM-DD" for native date pickers.
 *
 * @param {string} displayString e.g. "12/05/2002"
 * @returns {string} e.g. "2002-05-12"
 */
export function displayToIsoDate(displayString) {
  if (!displayString) return '';
  const parts = displayString.split('/');
  if (parts.length === 3 && parts[2]?.length === 4) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return '';
}
