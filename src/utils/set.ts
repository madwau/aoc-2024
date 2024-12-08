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

  add(obj: T) {
    return this.set.add(this.hash(obj));
  }

  has(obj: T) {
    return this.set.has(this.hash(obj));
  }

  get size() {
    return this.set.size;
  }

  private hash(obj: T): string {
    return JSON.stringify(obj);
  }
}
