import { Pipe, PipeTransform } from "@angular/core";
import { isEmpty } from "lodash";

@Pipe({
  name: "StringTransformPipe",
})
export class StringTransformPipe implements PipeTransform {
  transform(
    value: string | undefined,
    key: string,
    isDisplay: boolean | undefined
  ) {
    const displayValue = isEmpty(value) ? "N/A" : value;
    return isDisplay ? `${key}: ${displayValue}` : `${key}: N/A`;
  }
}
