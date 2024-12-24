import { readLines } from '../../utils/file';
import { bigSum } from '../../utils/math';

const lines = await readLines('day-22', 'input');
const secrets = lines.map(BigInt);

function next(secret: bigint, steps: number): bigint {
  for (let i = 0; i < steps; i++) {
    secret ^= secret * 64n;
    secret %= 16777216n;
    secret ^= secret / 32n;
    secret %= 16777216n;
    secret ^= secret * 2048n;
    secret %= 16777216n;
  }
  return secret;
}

console.log(bigSum(secrets.map(secret => next(secret, 2000))));
