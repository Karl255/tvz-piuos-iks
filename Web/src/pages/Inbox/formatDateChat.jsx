import { differenceInDays, format } from 'date-fns';
import { daysInWeek } from 'date-fns/constants';

export function formatDateChat(date) {
    const now = new Date();
    const timeFormatted = format(date, 'HH:mm');
    const dayDifference = differenceInDays(now, date);
    if (dayDifference === 0) {
        return timeFormatted;
    }
    if (dayDifference <= 7) {
        return `${daysInWeek(date)} ${timeFormatted}`;
    }
    return format('DD.MM.YYYY. HH:mm');
}
