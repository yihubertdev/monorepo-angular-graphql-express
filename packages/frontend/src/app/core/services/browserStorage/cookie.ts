import { Injectable } from "@angular/core";

@Injectable()
export class CookieService {
  constructor() {}

  /**
   * Get cookie
   *
   * @public
   */
  public getCookie(name: string) {
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
   * @public
   */
  public deleteCookie(name: string) {
    this.setCookie(name, "", -1);
  }

  /**
   * Set cookie
   *
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
