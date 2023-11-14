export abstract class FireStoreCacheService<T> {
  private _cache: Record<string, T> = {};

  protected abstract key: string;

  constructor() {}

  public get(): T | undefined {
    return this._cache[this.key];
  }

  public update(value: T) {
    this._cache[this.key] = value;
  }

  public delete(): void {
    delete this._cache[this.key];
  }
}
