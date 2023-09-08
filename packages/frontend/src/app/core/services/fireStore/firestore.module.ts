import { NgModule } from "@angular/core";
import {
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from "@angular/fire/firestore";
import { PostFireStore, ArticleFireStore } from "./blog.firestore";
import { UserService } from "./users.firestore";

@NgModule({
  declarations: [],
  imports: [
    provideFirestore(() =>
      initializeFirestore(getFirestore().app, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      })
    ),
  ],
  providers: [UserService, PostFireStore, ArticleFireStore],
  bootstrap: [],
})
export class FireStoreServiceModule {}
