export const getMostFrequentString = (strings: string[]): string => {
  const frequencyMap = new Map<string, number>();
  strings.forEach((string) => {
    frequencyMap.set(string, (frequencyMap.get(string) || 0) + 1);
  });

  let maxFrequency = 0;
  let mostFrequentString = "";
  frequencyMap.forEach((frequency, string) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostFrequentString = string;
    }
  });
  return mostFrequentString;
};
