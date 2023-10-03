import { Component, Input, OnInit } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { HOME_ADDRESS_PROFILE } from "../../core/static/auth.static";
import { accountSchema } from "../../core/joiSchema/auth.schema";
import {
  IUserDetailCollection,
  UserDetailCardComponent,
} from "../../shared/components/postCard/user-details-card.component";
import { UserService } from "../../core/services/fireStore/users.firestore";
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    UserDetailCardComponent,
  ],
  selector: "user-details-controller",
  template: `<mat-tab-group>
    <mat-tab label="Personal Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <user-details-card
              [collection]="collection"
              (formValue)="save($event)"></user-details-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
    </mat-tab>
    <mat-tab label="Business Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
    </mat-tab>
    <mat-tab label="Professional Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <mat-card class="example-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  class="example-header-image"></div>
                <mat-card-title>Shiba Inu</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  The Shiba Inu is the smallest of the six original and distinct
                  spitz breeds of dog from Japan. A small, agile dog that copes
                  very well with mountainous terrain, the Shiba Inu was
                  originally bred for hunting.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>LIKE</button>
                <button mat-button>SHARE</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsController implements OnInit {
  @Input({ required: true }) userId?: string;
  public isDisplay: boolean = true;
  public collection?: IUserDetailCollection<any>;

  constructor(private _userService: UserService, private _router: Router) {}

  async ngOnInit() {
    if (this.userId) {
      const [user] = await this._userService.retrieve({
        userId: this.userId,
      });

      await this._userService.retrieveCollectionDocs({
        userId: this.userId,
      });

      console.log(user);

      if (user) {
        this.collection = {
          uid: user.id,
          title: "Home Address",
          collectionId: "home_address",
          formInputList: HOME_ADDRESS_PROFILE,
          formInputSchema: accountSchema,
        };
        return;
      }

      this._router.navigate(["me", "posts"]);
    }
  }

  async save(formValue: any) {
    console.log(formValue);

    this._userService.createSubCollection(formValue);
  }
}
