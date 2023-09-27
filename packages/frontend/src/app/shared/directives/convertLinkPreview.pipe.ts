import { Pipe, PipeTransform } from "@angular/core";

interface ILinkPreview {
  value: string;
  links: string[];
}

@Pipe({
  name: "linkPreview",
  standalone: true,
})
export class LinkPreview implements PipeTransform {
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  private _tranformURL(value: string) {
    return value.replace(this._urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }

  public transform(
    value: string | undefined,
    key: string,
    isDisplay: boolean | undefined
  ): ILinkPreview | undefined {
    return value
      ? {
          value: this._tranformURL(value),
          links: value.match(this._urlRegex) as string[],
        }
      : undefined;
  }
}
