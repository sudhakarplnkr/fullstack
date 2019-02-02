import * as moment from 'moment';

export module DateExtension {
    export function formatDate(date?: Date) {
        if (date) {
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            return `${date.getFullYear()}-${month}-${day}`;
        }
        return '';
    }

    export function displayDate(date?: Date, format?: string) {
        if (!date) {
            return '';
        }
        if (format) {
            return moment(date).format(format);
        }
        return moment(date).format('DD/MM/YYYY');
    }
}