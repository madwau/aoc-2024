import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';

type Sequence = [number, number, number, number];

const SEQUENCE_LENGTH = 4;
const MAX_ROUNDS = 2000;

const lines = await readLines('day-22', 'input');
const secrets = lines.map(BigInt);

const histories = new Map<bigint, Map<string, number>>();

function next(secret: bigint): bigint {
  secret ^= secret * 64n;
  secret %= 16777216n;
  secret ^= secret / 32n;
  secret %= 16777216n;
  secret ^= secret * 2048n;
  secret %= 16777216n;
  return secret;
}

function computeHistories(): void {
  secrets.forEach(initialSecret => {
    const history: Map<string, number> = new Map();

    let secret = initialSecret;
    let sequence: number[] = [];
    let price = Number(secret % 10n);

    for (let round = 0; round < MAX_ROUNDS; round++) {
      secret = next(secret);
      const newPrice = Number(secret % 10n);
      sequence.push(newPrice - price);
      const key = sequence.slice(-SEQUENCE_LENGTH).join('');
      if (!history.has(key)) history.set(key, newPrice);
      price = newPrice;
    }

    histories.set(initialSecret, history);
  });
}

function price(secret: bigint, sequence: Sequence): number {
  const history = histories.get(secret)!;
  return history.get(sequence.join('')) ?? 0;
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
