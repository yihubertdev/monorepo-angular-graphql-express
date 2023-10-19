import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { ApolloQueryResult } from "@apollo/client/core";

const POST_INFORMATIONS = gql`
  query Query {
    posts
  }
`;

@Injectable({
  providedIn: "root",
})
export class NotificationHttpService {
  constructor(private apollo: Apollo) {}

  public getUserPosts(): Observable<ApolloQueryResult<Boolean>> {
    return this.apollo.watchQuery<Boolean>({
      query: POST_INFORMATIONS,
    }).valueChanges;
  }
}
