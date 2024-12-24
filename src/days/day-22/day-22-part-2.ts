import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';

type Sequence = [number, number, number, number];

type History = {
  prices: string;
  changes: string;
};

const MAX_ROUNDS = 2000;

const lines = await readLines('day-22', 'input');
const secrets = lines.map(BigInt);

const histories = new Map<bigint, History>();

function next(secret: bigint): bigint {
  secret ^= secret * 64n;
  secret %= 16777216n;
  secret ^= secret / 32n;
  secret %= 16777216n;
  secret ^= secret * 2048n;
  secret %= 16777216n;
  return secret;
}

function normalize(n: number): string {
  return n >= 0 ? `+${n}` : n.toString();
}

function computeHistories(): void {
  secrets.forEach(initialSecret => {
    let secret = initialSecret;
    let price = Number(secret % 10n);
    const history: History = { prices: '', changes: '' };

    for (let round = 0; round < MAX_ROUNDS; round++) {
      secret = next(secret);
      const newPrice = Number(secret % 10n);
      history.prices += normalize(newPrice);
      history.changes += normalize(newPrice - price);
      price = newPrice;
    }

    histories.set(initialSecret, history);
  });
}

function price(secret: bigint, sequence: Sequence): number {
  const history = histories.get(secret)!;
  const index = history.changes.indexOf(sequence.map(normalize).join(''));
  return index === -1 ? 0 : Number(history.prices.slice(index + 6, index + 8));
}

function totalPrice(sequence: Sequence): number {
  return sum(secrets.map(secret => price(secret, sequence)));
}

function bestSequenceAndPrice(): [Sequence, number] {
  let bestPrice = -Infinity;
  let bestSequence: Sequence = [0, 0, 0, 0];

  for (let a = -9; a <= 9; a++) {
    for (let b = -9; b <= 9; b++) {
      for (let c = -9; c <= 9; c++) {
        for (let d = -9; d <= 9; d++) {
          const sequence: Sequence = [a, b, c, d];
          const price = totalPrice(sequence);
          if (price > bestPrice) {
            bestPrice = price;
            bestSequence = sequence;
          }
        }
      }
    }
  }

  return [bestSequence, bestPrice];
}

computeHistories();

console.log(bestSequenceAndPrice());
