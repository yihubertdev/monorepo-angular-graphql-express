import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CookieService {
  constructor() {}

  /**
   * Get cookie
   *
   * @param {string} name cookie name
   * @public
   * @returns {string} cookie
   */
  public getCookie(name: string): string {
    const cookiesArray: Array<string> = document.cookie.split(";");
    const cookieName: string = `${name}=`;
    let value: string;

    cookiesArray.map((cookie) => {
      value = cookie.replace(/^\s+/g, "");

      if (value.indexOf(cookieName) == 0) {
        value = value.substring(cookieName.length, value.length);
      }
    });

    return "";
  }

  /**
   * Delete cookie
   *
   * @param {string} name cookie name
   * @public
   */
  public deleteCookie(name: string) {
    this.setCookie(name, "", -1);
  }

  /**
   * Set cookie
   *
   * @param {string} name cookie name
   * @param {string} value cookie name
   * @param {string} expireHours cookie name
   * @param {string} path cookie name
   * @public
   */
  public setCookie(
    name: string,
    value: string,
    expireHours: number,
    path: string = ""
  ) {
    const date: Date = new Date();

    // Set expire hour for the cookie
    date.setTime(date.getTime() + expireHours * 60 * 60 * 1000);

    // Expires cookie
    const expires: string = "expires=" + date.toUTCString();

    // Set the cookie
    document.cookie =
      name +
      "=" +
      value +
      "; " +
      expires +
      (path.length > 0 ? "; path=" + path : "");
  }
}
