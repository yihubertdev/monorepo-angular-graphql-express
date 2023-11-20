import { Pipe, PipeTransform } from "@angular/core";
import { MentionConfig } from "angular-mentions";
import { SETTING_CATEGORY } from "sources-types";
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
  async transform(value: Object): Promise<MentionConfig> {
    const users = await this._userService.listUsersWithCache(10);
    return {
      mentions: [
        {
          items: users.map((user) => user.userId),
          triggerChar: "@",
        },
      ],
    };
  }
}
