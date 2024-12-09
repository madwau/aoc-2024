export function exhaustiveCheck(message: string, x: never): never {
  throw new Error(`${message}: ${x}`);
}

export function isNumber(x: any) {
  return typeof x === 'number';
}
