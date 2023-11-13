import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class FireStoreCacheService<T> {
  private _cache: BehaviorSubject<T | null>;
  protected readonly cacheObserver$: Observable<T | null>;
  constructor() {
    this.cacheObserver$ = this._cache.asObservable();
  }

  public get() {
    return this.cacheObserver$;
  }

  public update(data: T) {
    this._cache.next(data);
  }
}
