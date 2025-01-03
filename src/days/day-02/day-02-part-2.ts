import { readNumericLines } from '../../utils/file';

type Level = number;
type Report = Level[];

function isStrictlyMonotonic(
  report: Report,
  order: 'inc' | 'dec',
  minDiff: number = 1,
  maxDiff: number = 3,
) {
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (order === 'inc' && (diff < minDiff || diff > maxDiff)) {
      return false;
    }
    if (order === 'dec' && (diff > -minDiff || diff < -maxDiff)) {
      return false;
    }
  }
  return true;
}

function isSafe(report: Report) {
  return isStrictlyMonotonic(report, 'inc') || isStrictlyMonotonic(report, 'dec');
}

function allVariations(report: Report): Report[] {
  return [report, ...report.map((_, i) => report.filter((_, j) => i !== j))];
}

const reports = await readNumericLines<Report[]>('day-02', 'input');

console.log(reports.map(allVariations).filter(variations => variations.some(isSafe)).length);
