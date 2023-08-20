import { NgModule } from "@angular/core";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { PostFireStore, ArticleFireStore } from "./blog.firestore";
import { UserService } from "./users.firestore";

@NgModule({
  declarations: [],
  imports: [provideFirestore(() => getFirestore())],
  providers: [UserService, PostFireStore, ArticleFireStore],
  bootstrap: [],
})
export class FireStoreServiceModule {}
