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
      enableIndexedDbPersistence(db);
      return db;
    }),
  ],
  providers: [UserService, PostFireStore, ArticleFireStore],
  bootstrap: [],
})
export class FireStoreServiceModule {}
