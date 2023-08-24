import { Pipe, PipeTransform } from "@angular/core";
export const defaultUserPhoto =
  "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/profiles%2Fprofile-CaOTPL0jHQfPAcehSVlfCcEFNAN2.png?alt=media&token=3565cc80-420f-4f22-b642-bb1885fb2982";
@Pipe({
  name: "StringTransformPipe",
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
  name: "UserPhotoPipe",
})
export class UserPhotoPipe implements PipeTransform {
  transform(photoURL: string | undefined) {
    return photoURL ?? defaultUserPhoto;
  }
}
