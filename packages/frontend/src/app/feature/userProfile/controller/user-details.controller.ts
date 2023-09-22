import { Component, Input } from "@angular/core";
import { accountSchema } from "../../../core/joiSchema/auth.schema";
import { yourAccountFormList } from "../../../core/static/auth.static";

@Component({
  selector: "user-details-controller",
  template: `<mat-tab-group>
    <mat-tab label="Personal Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
            <mat-card class="example-card">
              <mat-card-header>
                <mat-card-title>Home Address</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="row">
                  <div class="col">
                    <form-input-list-component
                      [formInputList]="formInputList"
                      errorLocation="AuthModule.YourAccountController"
                      [validatorSchema]="accountSchema"
                      buttonName="Save"
                      (formValue)="save($event)"></form-input-list-component>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>Edit</button>
                <button mat-button>Close Edit</button>
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
    <mat-tab label="Business Profile"> Content 2 </mat-tab>
    <mat-tab label="Professional Profile"> Content 3 </mat-tab>
  </mat-tab-group>`,
  styleUrls: ["../user-profile.style.css"],
})
export class UserDetailsController {
  @Input() userId?: string;
  public formInputList = yourAccountFormList;
  public accountSchema: any = accountSchema;

  save(formValue: any) {
    console.log(formValue);
  }
}
