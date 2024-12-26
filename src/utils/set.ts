export function isSubset<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
}

export class HashSet<T> {
  private readonly set;

  constructor(objs?: T[]) {
    this.set = new Set(objs?.map(this.hash));
  }

  static merge<T>(sets: HashSet<T>[]): HashSet<T> {
    const result = new HashSet<T>();
    for (const set of sets) {
      for (const hash of set.set) {
        result.addHash(hash);
      }
    }
    return result;
  }

  add(obj: T) {
    return this.set.add(this.hash(obj));
  }

  has(obj: T) {
    return this.set.has(this.hash(obj));
  }

  delete(obj: T) {
    return this.set.delete(this.hash(obj));
  }

  get size() {
    return this.set.size;
  }

  private hash(obj: T): string {
    return JSON.stringify(obj);
  }

  private addHash(hash: string) {
    return this.set.add(hash);
  }
}
