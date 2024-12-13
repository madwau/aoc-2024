export class HashMap<K, V> {
  private readonly map;

  constructor() {
    this.map = new Map();
  }

  set(key: K, value: V) {
    this.map.set(this.hash(key), value);
  }

  get(key: K) {
    return this.map.get(this.hash(key));
  }

  delete(key: K) {
    return this.map.delete(this.hash(key));
  }

  has(key: K) {
    return this.map.has(this.hash(key));
  }

  values() {
    return this.map.values();
  }

  private hash(key: K): string {
    return JSON.stringify(key);
  }
}
