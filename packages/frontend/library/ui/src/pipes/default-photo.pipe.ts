import { Pipe, PipeTransform } from "@angular/core";
import { DEFAULT_CONSTANTS } from "type-sources";

@Pipe({
  standalone: true,
  name: "defaultUserPhoto",
})
export class UserPhotoPipe implements PipeTransform {
  transform(photoURL: string | undefined) {
    return photoURL ?? DEFAULT_CONSTANTS.DEFAULT_USER_PHOTO;
  }
}
