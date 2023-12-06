import { Component, ViewChild } from "@angular/core";
import {
  MatStepper,
  MatStepperModule,
  StepperOrientation,
} from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { Observable, map } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { AsyncPipe, NgFor } from "@angular/common";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { IStepper, SIGNUP_STEPPERS } from "src/app/core/static/auth.static";
import { IUser } from "sources-types";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    NgFor,
    MatButtonModule,
    MatStepperModule,
    AsyncPipe,
    FormInputListComponent,
  ],
  selector: "user-profile-sign-up-controller",
  template: `
    <mat-stepper
      style="height: 100dvh;"
      #stepper
      [orientation]="(stepperOrientation | async)!">
      <mat-step *ngFor="let stepper of steppers; index as i">
        <ng-template matStepLabel>{{ stepper.label }}</ng-template>
        <h2 class="mt-4 mb-4">{{ stepper.title }}</h2>
        <h5 class="mt-4 mb-4">{{ stepper.subTitle }}</h5>
        <br />
        <form-input-list-component
          [formInputList]="stepper.formInput"
          errorLocation="AuthModule.YourAccountController"
          [validatorSchema]="stepper.formValidate"
          buttonName="Next"
          (formValue)="save($event, i)"></form-input-list-component>
      </mat-step>
    </mat-stepper>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSignUpController {
  @ViewChild("stepper") private myStepper!: MatStepper;
  public steppers: IStepper = SIGNUP_STEPPERS;
  public stepperOrientation: Observable<StepperOrientation>;
  public currentUser?: IUser;

  constructor(
    breakpointObserver: BreakpointObserver,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));

    const preloadData = this.route.snapshot.data as {
      user: IUser;
    };

    this.currentUser = preloadData.user;
  }

  save(value: any, index: number) {
    console.log(value);
    this.myStepper.next();

    if (index === this.steppers.length - 1) {
      this._router.navigate(["/users", "me", "personal-profile"]);
    }
  }
}
