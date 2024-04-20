export const getStartingDate = (): Date => {
  const year: number = new Date().getFullYear();
  const month: number = 8; // september

  const daysInMonth: number = new Date(year, month, 0).getDate();

  for (let i: number = 1; i <= daysInMonth; i++) {
    const newDate: Date = new Date(year, month, i);

    if (newDate.getDay() === 0) {
      //Sunday
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
