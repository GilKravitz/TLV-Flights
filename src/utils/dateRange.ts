// check if startDate + daysAfter < date
export const isDateAfter = (startDate: Date, daysAfter: number, date: Date): boolean => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + daysAfter);
  return endDate < date;
};
