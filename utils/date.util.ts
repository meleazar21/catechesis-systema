import { DateFormats, DateSeparator } from "@/enums/date-formats"

export const formattDate = (currentDate: Date, format: DateFormats = DateFormats.DD_MM_YYYY, separator: DateSeparator = DateSeparator.HYPHEN) => {
    const day = currentDate.getDay() < 10 ? `0${currentDate.getDay()}` : currentDate.getDay();
    const monthNumber = currentDate.getMonth() + 1;
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
    const year = currentDate.getFullYear();
    switch (format) {
        case DateFormats.DD_MM_YYYY:
            return `${day}${separator}${month}${separator}${year}`;
        case DateFormats.YYYY_MM_DD:
            return `${year}${separator}${month}${separator}${day}`;
        case DateFormats.MM_DD_YYYY:
            return `${month}${separator}${day}${separator}${year}`;
        default:
            return `${day}${separator}${month}${separator}${year}`;
    }
}