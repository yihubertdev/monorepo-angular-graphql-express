import { Component, ViewChild } from "@angular/core";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { NgFor, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ResponsiveStepperDirective } from "src/app/shared/directives/matDrawerResponsive/mat-drawer-menu";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { User } from "@angular/fire/auth";
import { SITE_ROUTE_PAGE } from "src/app/core/static/menu.static";

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
          mat-fab
          extended
          color="primary"
          (click)="sendEmail()">
          Resend
          <mat-icon>send</mat-icon>
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
      </mat-step>
    </mat-stepper>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSignUpController {
  @ViewChild("mystepper") private myStepper!: MatStepper;
  public isShow: Boolean = false;
  public steppers: IStepper = [
    {
      label: "Verify Your Email",
      title: "Your Email is not yet verified.",
      subTitle: "Verify your email to log in",
    },
    {
      label: "Register Your Phone Number",
      title: "Your Phone number is not yet registered",
      subTitle: "Verify your phone number to log in",
    },
  ];
  public authUser: User;

  constructor(private _router: Router, private authService: AuthService) {
    this.authUser = this.authService.getAuth()!;
  }

  async sendEmail() {
    if (this.authUser.emailVerified) {
      this.myStepper.next();
      throw new Error("Email already verified");
    }
    await this.authService.sendVerificationMail(this.authUser);
  }

  save(value: any, index: number) {
    this.myStepper.next();
    if (index === this.steppers.length - 1) {
      this._router.navigate(["/users", "settings"]);
    }
  }

  public logout() {
    this.authService.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
