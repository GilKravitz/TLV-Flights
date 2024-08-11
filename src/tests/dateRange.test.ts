import { isDateAfter } from "../utils/dateRange";

describe("isDateAfter", () => {
  it("should return true if startDate + daysAfter < endDate", () => {
    const startDate = new Date("2024-08-08");
    const daysAfter = 1;
    const endDate = new Date("2024-08-10");
    const result = isDateAfter(startDate, daysAfter, endDate);
    expect(result).toBe(true);
  });

  it("should return false if startDate + daysAfter >= endDate", () => {
    const startDate = new Date("2024-08-08");
    const daysAfter = 1;
    const endDate = new Date("2024-08-08");
    const result = isDateAfter(startDate, daysAfter, endDate);
    expect(result).toBe(false);
  });
});
