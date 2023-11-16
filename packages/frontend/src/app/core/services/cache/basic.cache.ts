export abstract class FireStoreCacheService<T> {
  private _cache: Record<string, T> = {};

  protected abstract key: string;

  constructor() {}

  public get(key?: string): T | undefined {
    return this._cache[this.key + key];
  }

  public update(value: T, key?: string) {
    this._cache[this.key + key] = value;
  }

  public delete(key?: string): void {
    delete this._cache[this.key + key];
  }
}
