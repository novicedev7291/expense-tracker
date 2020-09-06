import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
});

/**
 * @param {Date} date
 */
function AppDate(date) {
  const formatUsing = (format) => dayjs(date).format(format);
  return {
    toMonth: () => dayjs(date).format('MMMM'),
    toFormat: formatUsing,
    toDisplayStr: () => formatUsing('DD/MM/YYYY'),
    value: () => date,
  };
}

export default AppDate;
