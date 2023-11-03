import { Pipe, PipeTransform } from "@angular/core";
import { SETTING_CATEGORY } from "sources-types";
import { transpileModule } from "typescript";

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

@Pipe({
  standalone: true,
  name: "SettingsCategoryFilter",
})
export class SettingsCategoryFilterPipe implements PipeTransform {
  transform(value: string, display: boolean) {
    switch (value) {
      case SETTING_CATEGORY.TAX_RETURN:
        return true && display;
      default:
        return false && display;
    }
  }
}

@Pipe({
  standalone: true,
  name: "FileNameGenerator",
})
export class FileNameGeneratorPipe implements PipeTransform {
  transform(value: string) {
    return value.split(" ").join("_");
  }
}
