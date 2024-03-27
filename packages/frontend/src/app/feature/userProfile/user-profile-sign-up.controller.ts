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
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-list.component";

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
      attrResponsiveStepper
      [selectedIndex]="authUser.emailVerified">
      <mat-step *ngFor="let stepper of steppers; index as i">
        <ng-template matStepLabel>{{ stepper.label }}</ng-template>
        <h2 class="mt-4 mb-4">{{ stepper.title }}</h2>
        <h5 class="mt-4 mb-4">{{ stepper.subTitle }}</h5>
        <a
          class="mt-4"
          style="width: 98%;"
          mat-fab
          extended
          color="primary">
          Resend
          <mat-icon>person</mat-icon>
        </a>
        <a
          class="mt-4"
          style="width: 98%;"
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
  public isLoading: boolean = false;
  public steppers: IStepper = [
    {
      label: "Verify Your Email",
      title: "Your Email is not yet verified.",
      subTitle: "Verify your email to log in",
    },
  ];
  public authUser: User;
  public hasError?: string;

  constructor(
    private _router: Router,
    private authService: AuthService
  ) {
    this.authUser = this.authService.getAuth()!;
  }

  public logout() {
    this.authService.logout();
    this._router.navigate(SITE_ROUTE_PAGE.LOGIN);
  }
}
