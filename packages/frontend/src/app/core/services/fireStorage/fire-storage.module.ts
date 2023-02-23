import { NgModule } from "@angular/core";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { FireAuthServiceModule } from "../fireAuth/auth.module";
import { FireStoreServiceModule } from "../fireStore/firestore.module";
import { FormFileStorageService } from "./form-file.bucket";
import { ProfileStorageService } from "./profile.bucket";

@NgModule({
  declarations: [],
  imports: [provideStorage(() => getStorage()), FireStoreServiceModule, FireAuthServiceModule],
  providers: [ProfileStorageService, FormFileStorageService],
  bootstrap: [],
})
export class FireStorageServiceModule {}
