import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "linkPreview",
  standalone: true,
})
export class LinkPreviewPipe implements PipeTransform {
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  private _tranformURL(value: string) {
    return value.replace(this._urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }

  public transform(value?: string, key?: string, isDisplay?: boolean): string {
    return value ? this._tranformURL(value) : "";
  }
}
