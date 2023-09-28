import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { FormInputListModule } from "src/app/shared/components/formInputList/form-input-list.module";
import { yourAccountFormList } from "src/app/core/static/auth.static";
import { accountSchema } from "src/app/core/joiSchema/auth.schema";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    GridListResponsiveDirectiveModule,
    FormInputListModule,
  ],
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
              <mat-card-actions>
                <button
                  mat-button
                  (click)="isDisplay = true">
                  Display
                </button>
                <button
                  mat-button
                  (click)="isDisplay = false">
                  Edit
                </button>
              </mat-card-actions>
              <mat-card-content>
                <div class="row">
                  <div class="col">
                    <ng-container *ngIf="isDisplay">
                      <p *ngFor="let form of formInputList">
                        {{ form.label }}: {{ form.value }}
                      </p>
                    </ng-container>
                    <form-input-list-component
                      *ngIf="!isDisplay"
                      [formInputList]="formInputList"
                      errorLocation="AuthModule.YourAccountController"
                      [validatorSchema]="accountSchema"
                      buttonName="Save"
                      (formValue)="save($event)"></form-input-list-component>
                  </div>
                </div>
              </mat-card-content>
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
    <mat-tab label="Business Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
            <mat-card class="example-card">
              <mat-card-header>
                <mat-card-title>Home Address</mat-card-title>
              </mat-card-header>
              <mat-card-actions>
                <button
                  mat-button
                  (click)="isDisplay = true">
                  Display
                </button>
                <button
                  mat-button
                  (click)="isDisplay = false">
                  Edit
                </button>
              </mat-card-actions>
              <mat-card-content>
                <div class="row">
                  <div class="col">
                    <ng-container *ngIf="isDisplay">
                      <p *ngFor="let form of formInputList">
                        {{ form.label }}: {{ form.value }}
                      </p>
                    </ng-container>
                    <form-input-list-component
                      *ngIf="!isDisplay"
                      [formInputList]="formInputList"
                      errorLocation="AuthModule.YourAccountController"
                      [validatorSchema]="accountSchema"
                      buttonName="Save"
                      (formValue)="save($event)"></form-input-list-component>
                  </div>
                </div>
              </mat-card-content>
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
    <mat-tab label="Professional Profile">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
            <mat-card class="example-card">
              <mat-card-header>
                <mat-card-title>Home Address</mat-card-title>
              </mat-card-header>
              <mat-card-actions>
                <button
                  mat-button
                  (click)="isDisplay = true">
                  Display
                </button>
                <button
                  mat-button
                  (click)="isDisplay = false">
                  Edit
                </button>
              </mat-card-actions>
              <mat-card-content>
                <div class="row">
                  <div class="col">
                    <ng-container *ngIf="isDisplay">
                      <p *ngFor="let form of formInputList">
                        {{ form.label }}: {{ form.value }}
                      </p>
                    </ng-container>
                    <form-input-list-component
                      *ngIf="!isDisplay"
                      [formInputList]="formInputList"
                      errorLocation="AuthModule.YourAccountController"
                      [validatorSchema]="accountSchema"
                      buttonName="Save"
                      (formValue)="save($event)"></form-input-list-component>
                  </div>
                </div>
              </mat-card-content>
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
  </mat-tab-group>`,
  styleUrls: ["./user-profile.style.css"],
})
export class UserDetailsController {
  @Input() userId?: string;
  public formInputList = yourAccountFormList;
  public accountSchema: any = accountSchema;
  public isDisplay: boolean = true;

  save(formValue: any) {
    console.log(formValue);
  }
}
