import format from 'date-fns/format';
import { pt } from 'date-fns/locale';

function maskDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = format(date, 'EEEE, dd/MM', { locale: pt });
  const dayOfWeek = formattedDate.replace('-feira', '');
  return `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1)}`;
}

function calculateDiffHours(start, end) {
  const diffMilliseconds = new Date(start) - new Date(end);
  const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
  return Number(diffHours);
}

function formatTimeRange(startsAt, endsAt) {
  const startsAtDate = new Date(startsAt);
  const endsAtDate = new Date(endsAt);

  const startsAtHours = startsAtDate.getHours().toString().padStart(2, '0');
  const startsAtMinutes = startsAtDate.getMinutes().toString().padStart(2, '0');
  const endsAtHours = endsAtDate.getHours().toString().padStart(2, '0');
  const endsAtMinutes = endsAtDate.getMinutes().toString().padStart(2, '0');

  return `${startsAtHours}:${startsAtMinutes} - ${endsAtHours}:${endsAtMinutes}`;
}

export { maskDate, calculateDiffHours, formatTimeRange };
