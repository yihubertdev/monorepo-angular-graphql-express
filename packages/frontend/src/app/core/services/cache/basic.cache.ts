import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FireStoreCacheService<T> {
  private _cache: Record<string, T> = {};

  constructor() {}

  public get(key: string): T | undefined {
    return this._cache[key];
  }

  public update(key: string, value: T) {
    this._cache[key] = value;
  }
}
