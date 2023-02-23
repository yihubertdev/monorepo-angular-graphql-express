import { Injectable } from "@angular/core";
import { EMPTY_JSON_PARSE } from "../../models/constants";

@Injectable()
export class LocalStorageService {
  constructor() {}

  /**
   * Get local storage
   *
   * @public
   * @param {string} key
   * @return {T}
   */
  public getLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) ?? EMPTY_JSON_PARSE);
  }

  /**
   * Set local storage
   *
   * @public
   * @param {string} key
   * @param {T} value
   * @return {T}
   */
  public setLocalStorage<T>(key: string, value: T): T {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  /**
   * Remove local storage
   *
   * @public
   * @param {string} key
   * @return {void}
   */
  public deleteLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
