import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';

export function formatDatePost(date) {
    const now = new Date();
    const dayDifference = differenceInDays(now, date);
    if (dayDifference === 0) {
        const hourDifference = differenceInHours(now, date);
        if (hourDifference === 0) return `${differenceInMinutes(now, date)} minutes ago`;
        return `${hourDifference} hours ago`;
    }
    if (dayDifference < 10) {
        return `${dayDifference} days ago`;
    }
    return format('DD.MM.YYYY. HH:mm');
}
