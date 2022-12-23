import dayjs from 'dayjs';

function useLocale() {
  dayjs()
  const weekDays = [];
  for (let i = 1; i <= 7; i++) {
    weekDays.push(dayjs().day(i))
  }
  return weekDays;
}

export { useLocale };
