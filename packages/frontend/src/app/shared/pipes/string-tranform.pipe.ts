import { Pipe, PipeTransform } from "@angular/core";
import { MentionConfig } from "angular-mentions";
import { SETTING_CATEGORY } from "sources";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
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
  name: "FileNameGenerator",
})
export class FileNameGeneratorPipe implements PipeTransform {
  transform(value: string) {
    return value.split(" ").join("_");
  }
}

@Pipe({
  standalone: true,
  name: "AddMentionUsers",
})
export class AddMentionUsersPipe implements PipeTransform {
  constructor(private _userService: UserService) {}
  transform(value: string): MentionConfig {
    const users = this._userService.listUsersCache();
    return {
      mentions: [
        {
          items: users?.map((user) => user.userId),
          triggerChar: "@",
        },
      ],
    };
  }
}
