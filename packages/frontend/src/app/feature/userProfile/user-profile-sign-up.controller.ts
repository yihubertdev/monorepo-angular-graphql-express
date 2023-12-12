import { Component } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { NgFor, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ResponsiveStepperDirective } from "src/app/shared/directives/matDrawerResponsive/mat-drawer-menu";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { User } from "@angular/fire/auth";
import { SITE_ROUTE_PAGE } from "src/app/core/static/menu.static";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { userSignUpSchema } from "../../core/joiSchema";
import { PHONE_VERIFY } from "src/app/core/static/form.static";

export interface IFormStepper {
  label: string;
  title: string;
  subTitle: string;
}

export type IStepper = IFormStepper[];
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ResponsiveStepperDirective,
    FormInputListComponent,
  ],
  selector: "user-profile-sign-up-controller",
  template: `
    <mat-stepper
      style="height: 100dvh;"
      #mystepper
      responsiveStepper
      [selectedIndex]="authUser.emailVerified ? 1 : 0">
      <mat-step *ngFor="let stepper of steppers; index as i">
        <ng-template matStepLabel>{{ stepper.label }}</ng-template>
        <h2 class="mt-4 mb-4">{{ stepper.title }}</h2>
        <h5 class="mt-4 mb-4">{{ stepper.subTitle }}</h5>
        <a
          class="m-4"
          *ngIf="i === 0"
          mat-fab
          extended
          color="primary"
          (click)="logout()">
          Resend
          <mat-icon>person</mat-icon>
        </a>
        <a
          *ngIf="i === 1"
          class="m-4"
          mat-fab
          extended
          color="primary"
          (click)="isShow = !isShow">
          Verify
          <mat-icon>person</mat-icon>
        </a>
        <a
          class="m-4"
          mat-fab
          extended
          color="warn"
          (click)="logout()">
          Log out
          <mat-icon>person</mat-icon>
        </a>
        <form-input-list-component
          *ngIf="i === 1 && isShow"
          [list]="list"
          errorLocation="EmailSignUpController"
          [schema]="schema"
          buttonName="Send"
          (formValue)="send($event)"
          [loading]="isLoading"></form-input-list-component>
      </mat-step>
    </mat-stepper>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSignUpController {
  public list = PHONE_VERIFY;
  public schema = userSignUpSchema;
  public isLoading: boolean = false;
  public isShow: Boolean = false;
  public steppers: IStepper = [
    {
      label: "Verify Your Email",
      title: "Your Email is not yet verified.",
      subTitle: "Verify your email to log in",
    },
    {
      label: "Register Your Phone",
      title: "Register Your Phone Number.",
      subTitle: "Register your phone number to log in",
    },
    {
      label: "Verify Your Phone",
      title: "Your Phone is not yet verified.",
      subTitle: "Verify your phone number to log in",
    },
  ];
  public authUser: User;
  public hasError?: string;

  constructor(private _router: Router, private authService: AuthService) {
    this.authUser = this.authService.getAuth()!;
  }

  public logout() {
    this.authService.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }

  public send(value: Record<string, number | string>) {}
}
