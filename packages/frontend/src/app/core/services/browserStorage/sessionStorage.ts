import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SessionStorageService {
  constructor() {}

  /**
   * Get session storage
   *
   * @public
   * @param {string} key session storage key
   * @returns {T} session storage value
   */
  public getSessionStorage<T>(key: string): T | undefined {
    const result = sessionStorage.getItem(key);
    // If session data is not existed, return null
    if (!result) {
      return undefined;
    }

    try {
      // If session data is not json format, return null
      return JSON.parse(result);
    } catch {
      return undefined;
    }
  }

  /**
   * Get all session storage
   *
   * @public
   * @returns {Storage} session storage
   */
  public getAllSessionStorage(): Storage {
    return sessionStorage;
  }

  /**
   * Set session storage
   *
   * @public
   * @param {string} key session storage key
   * @param {T} value session storage value
   * @returns {T} storage
   */
  public setSessionStorage<T>(key: string, value: T): T {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  /**
   * Remove session storage
   *
   * @public
   * @param {string} key session storage key
   * @returns {void}
   */
  public deleteSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }
}
