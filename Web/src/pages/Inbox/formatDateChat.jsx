import { differenceInDays, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDateChat(date) {
    const now = new Date();
    const timeFormatted = format(date, 'HH:mm');
    const dayDifference = differenceInDays(now, date);
    if (dayDifference === 0) {
        return timeFormatted;
    }
    if (dayDifference <= 7) {
        return `${format(date, 'EEE', { locale: enUS })}, ${timeFormatted}`;
    }
    return format('DD.MM.YYYY. HH:mm');
}
