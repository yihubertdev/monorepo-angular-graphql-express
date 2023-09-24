import { Injectable } from "@angular/core";
import { SignalsSimpleStoreService } from "./basic.signal";
import { User } from "firebase/auth";

@Injectable()
export class UserSignalsStateService extends SignalsSimpleStoreService<User | null> {
  constructor() {
    super();
  }
}
