/**
 * Time formatting utilities for inputs.
 * Ensures start time is entered and displayed in standard time format (HH:MM or HH:MM AM/PM).
 * Prevents inputting raw strings like "1111111111111111" by capping digits and auto-formatting.
 */

/**
 * Automatically formats digits into HH:MM or HH:MM AM/PM format as the user types.
 * Prevents typing long invalid numbers like "11111111111111".
 *
 * @param {string} value Raw input value
 * @returns {string} Formatted time string
 */
export function formatTimeInput(value) {
  if (!value) return '';

  const upper = value.toUpperCase();
  let period = '';
  if (upper.includes('PM') || upper.endsWith('P')) {
    period = 'PM';
  } else if (upper.includes('AM') || upper.endsWith('A')) {
    period = 'AM';
  }

  // If user typed a colon explicitly, parse hours and minutes relative to the colon
  if (value.includes(':')) {
    const colonIndex = value.indexOf(':');
    const hPart = value.slice(0, colonIndex).replace(/\D/g, '').slice(0, 2);
    const mPart = value.slice(colonIndex + 1).replace(/\D/g, '').slice(0, 2);

    let h = hPart ? parseInt(hPart, 10) : 0;
    if (period && h > 12) h = 12;
    if (!period && h > 23) h = 23;
    const formattedH = hPart ? String(h).padStart(2, '0') : '';

    let formattedM = mPart;
    if (mPart.length === 2) {
      let m = parseInt(mPart, 10);
      if (m > 59) m = 59;
      formattedM = String(m).padStart(2, '0');
    }

    const timeStr = `${formattedH}:${formattedM}`;
    return period ? `${timeStr} ${period}` : timeStr;
  }

  // Extract digits only
  const rawDigits = value.replace(/\D/g, '').slice(0, 4);
  if (!rawDigits) {
    return period ? ` ` + period : '';
  }

  // Handle single digit
  if (rawDigits.length === 1) {
    return period ? `${rawDigits} ${period}` : rawDigits;
  }

  // Handle 2 digits
  if (rawDigits.length === 2) {
    let h = parseInt(rawDigits, 10);
    if (period && h > 12) h = 12;
    if (!period && h > 23) h = 23;

    const formattedH = String(h).padStart(2, '0');
    return period ? `${formattedH} ${period}` : formattedH;
  }

  // Handle 3 or 4 digits
  let hours = '';
  let minutes = '';

  if (rawDigits.length === 3) {
    const firstTwo = parseInt(rawDigits.slice(0, 2), 10);
    // If first two digits can form a valid hour (up to 23 or 12 if period)
    const maxH = period ? 12 : 23;
    if (firstTwo <= maxH) {
      hours = rawDigits.slice(0, 2);
      minutes = rawDigits.slice(2);
    } else {
      hours = rawDigits.slice(0, 1).padStart(2, '0');
      minutes = rawDigits.slice(1);
    }
  } else {
    // 4 digits (HHMM)
    hours = rawDigits.slice(0, 2);
    minutes = rawDigits.slice(2, 4);
  }

  let hNum = parseInt(hours, 10);
  if (period && hNum > 12) hNum = 12;
  if (!period && hNum > 23) hNum = 23;
  hours = String(hNum).padStart(2, '0');

  let mNum = parseInt(minutes, 10);
  if (mNum > 59) mNum = 59;
  minutes = String(mNum).padStart(minutes.length, '0');

  const formattedTime = `${hours}:${minutes}`;
  return period ? `${formattedTime} ${period}` : formattedTime;
}

/**
 * Sets or updates the AM/PM period of a time string.
 *
 * @param {string} timeStr Current time value e.g. "09:00" or "09:00 AM"
 * @param {'AM'|'PM'} period
 * @returns {string} e.g. "09:00 AM"
 */
export function setTimePeriod(timeStr, period) {
  if (!timeStr) return `09:00 ${period}`;
  const clean = timeStr.replace(/\s*(AM|PM)/i, '').trim();
  if (!clean) return `09:00 ${period}`;
  
  // Format hours and minutes if available
  const parts = clean.split(':');
  if (parts.length >= 2) {
    let h = parseInt(parts[0], 10);
    if (isNaN(h)) h = 9;
    if (h > 12) h = h % 12 || 12;
    if (h === 0) h = 12;
    const m = parts[1].slice(0, 2).padEnd(2, '0');
    return `${String(h).padStart(2, '0')}:${m} ${period}`;
  } else if (parts[0]) {
    let h = parseInt(parts[0], 10);
    if (isNaN(h)) h = 9;
    if (h > 12) h = h % 12 || 12;
    if (h === 0) h = 12;
    return `${String(h).padStart(2, '0')}:00 ${period}`;
  }
  return `${clean} ${period}`;
}

/**
 * Converts 24-hour time "HH:MM" (from native time picker) to 12-hour display "HH:MM AM/PM".
 *
 * @param {string} time24 e.g. "14:30" or "09:00"
 * @returns {string} e.g. "02:30 PM" or "09:00 AM"
 */
export function time24To12(time24) {
  if (!time24) return '';
  const parts = time24.split(':');
  if (parts.length < 2) return time24;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);
  if (isNaN(hours)) return time24;
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
}

/**
 * Converts display time (e.g. "02:30 PM", "9:30 AM", or "14:30") to 24-hour "HH:MM" for native picker.
 *
 * @param {string} timeStr
 * @returns {string} e.g. "14:30"
 */
export function time12To24(timeStr) {
  if (!timeStr) return '';
  const trimmed = timeStr.trim().toUpperCase();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/);
  if (!match) return '';
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3];

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}
