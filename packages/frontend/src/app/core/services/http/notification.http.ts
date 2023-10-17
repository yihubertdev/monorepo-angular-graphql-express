import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Apollo, gql } from "apollo-angular";

@Injectable({
  providedIn: "root",
})
export class NotificationHttpService {
  constructor(private apollo: Apollo) {}

  public sendFCM(token: string) {}
}
