import { getMostFrequentString } from "../utils/getMostFrequentString";

describe("getMostFrequentString", () => {
  it("should return the most frequent string in the array", () => {
    const strings = ["apple", "banana", "apple", "banana", "banana"];
    const result = getMostFrequentString(strings);
    expect(result).toBe("banana");
  });

  it("should return an empty string if the array is empty", () => {
    const strings: string[] = [];
    const result = getMostFrequentString(strings);
    expect(result).toBe("");
  });

  it("should return the string itself if the array contains only one string", () => {
    const strings = ["apple"];
    const result = getMostFrequentString(strings);
    expect(result).toBe("apple");
  });

  it("should return the first most frequent string if multiple strings have the same frequency", () => {
    const strings = ["apple", "banana", "apple", "banana"];
    const result = getMostFrequentString(strings);
    expect(result).toBe("apple");
  });
});
