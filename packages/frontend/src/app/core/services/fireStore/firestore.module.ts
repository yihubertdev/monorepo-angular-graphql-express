import { NgModule } from "@angular/core";
import {
  enableIndexedDbPersistence,
  getFirestore,
  provideFirestore,
} from "@angular/fire/firestore";
import { PostFireStore, ArticleFireStore } from "./blog.firestore";
import { UserService } from "./users.firestore";

@NgModule({
  declarations: [],
  imports: [
    provideFirestore(() => {
      const db = getFirestore();

      enableIndexedDbPersistence(db)
        .then(() => console.log("Enabled offline persistence"))
        .catch((error) => {
          if (error.code == "failed-precondition") {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
          } else if (error.code == "unimplemented") {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
          }
        });
      return db;
    }),
  ],
  providers: [UserService, PostFireStore, ArticleFireStore],
  bootstrap: [],
})
export class FireStoreServiceModule {}
