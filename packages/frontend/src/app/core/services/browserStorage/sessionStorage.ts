import { Injectable } from "@angular/core";
import { EMPTY_JSON_PARSE } from "../../models/constants";

@Injectable()
export class SessionStorageService {
  constructor() {}

  /**
   * Get session storage
   *
   * @public
   * @param {string} key
   * @return {T}
   */
  public getSessionStorage<T>(key: string): T | null {
    const result = sessionStorage.getItem(key);

    // If session data is not existed, return null
    if (!result) {
      return null;
    }

    try {
      // If session data is not json format, return null
      return JSON.parse(result);
    } catch {
      return null;
    }
  }

  /**
   * Get all session storage
   *
   * @public
   * @param {string} key
   * @return {T}
   */
  public getAllSessionStorage(): Storage {
    return sessionStorage;
  }

  /**
   * Set session storage
   *
   * @public
   * @param {string} key
   * @param {T} value
   * @return {T}
   */
  public setSessionStorage<T>(key: string, value: T): T {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  /**
   * Remove session storage
   *
   * @public
   * @param {string} key
   * @return {void}
   */
  public deleteSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }
}
