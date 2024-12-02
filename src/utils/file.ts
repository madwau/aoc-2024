function inputFilePath(day: string, file: string) {
  return `src/days/${day}/inputs/${file}.txt`;
}

export async function readLines(day: string, file: string) {
  const filePath = inputFilePath(day, file);
  const text = await Bun.file(filePath).text();
  return text.trim().split('\n');
}
