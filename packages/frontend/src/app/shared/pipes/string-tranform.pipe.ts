import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "stringTransform",
})
export class StringTransformPipe implements PipeTransform {
  transform(
    value: string | undefined,
    key: string,
    isDisplay: boolean | undefined
  ) {
    return !isDisplay ? `${key}: ${value ?? "NULL"}` : `${key}: N/A`;
  }
}
