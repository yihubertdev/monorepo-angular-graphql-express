import { Injectable } from "@angular/core";
import { EMPTY_JSON_PARSE } from "sources-types";

@Injectable()
export class LocalStorageService {
  constructor() {}

  /**
   * Get local storage
   *
   * @public
   * @param {string} key local storage
   * @returns {T} local storage
   */
  public getLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) ?? EMPTY_JSON_PARSE);
  }

  /**
   * Set local storage
   *
   * @public
   * @param {string} key local storage key
   * @param {T} value local storage value
   * @returns {T} local storage value
   */
  public setLocalStorage<T>(key: string, value: T): T {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  /**
   * Remove local storage
   *
   * @public
   * @param {string} key local storage key
   * @returns {void} local storage value
   */
  public deleteLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
