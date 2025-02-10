const getStartingDateForYear = (year: number, month: number): Date => {
  const daysInMonth: number = new Date(year, month, 0).getDate();

  for (let i: number = 1; i <= daysInMonth; i++) {
    const newDate: Date = new Date(year, month, i);

    if (newDate.getDay() === 0) {
      // Sunday
      return new Date(year, month, i - 2, 19, 0, 0, 0);
    }
    if (newDate.getDay() === 6) {
      // Saturday
      return new Date(year, month, i - 1, 19, 0, 0, 0);
    }
  }

  // return a default value if no date is found
  return new Date();
};

export const getStartingDate = (): Date => {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  const month = 8; // september

  let startingDate: Date = getStartingDateForYear(year, month);
  const endingDate = new Date(startingDate.getTime() + 24 * 60 * 60 * 1000);

  if (currentDate > endingDate) {
    year += 1;
    startingDate = getStartingDateForYear(year, month);
  }

  return startingDate;
};

type EventWeekend = Record<'saturday' | 'friday', Date>;

export const getEventWeekend = (): EventWeekend => {
  const friday = getStartingDate();
  const saturday = new Date(friday.getTime() + 24 * 60 * 60 * 1000);

  const eventDate: EventWeekend = {
    friday,
    saturday,
  };
  return eventDate;
};

export const isDuringEvent = (date = new Date()): boolean => {
  const { friday, saturday } = getEventWeekend();
  console.log({ date, friday, saturday });
  if (date >= friday && date <= saturday) {
    return true;
  }

  return false;
};
