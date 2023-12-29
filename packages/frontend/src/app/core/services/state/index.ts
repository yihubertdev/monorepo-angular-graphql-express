import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
abstract class StateManager<T> {
  private _subject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(
    null
  );
  public readonly observer$: Observable<T | null> =
    this._subject.asObservable();

  get get() {
    return this.observer$;
  }

  post(value: T | null) {
    this._subject.next(value);
  }
}

@Injectable({ providedIn: "root" })
export class StateDrawMenu extends StateManager<boolean> {}
