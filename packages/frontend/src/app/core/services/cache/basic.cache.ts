export abstract class FireStoreCacheService<T, K> {
  private _cache: Record<string, T> = {};

  protected abstract key: string;

  constructor() {}

  public get(key: K): T | undefined {
    return this._cache[this.key + key];
  }

  public update(value: T, key: K): void {
    this._cache[this.key + key] = value;
  }

  public delete(key: K): void {
    delete this._cache[this.key + key];
  }
}
