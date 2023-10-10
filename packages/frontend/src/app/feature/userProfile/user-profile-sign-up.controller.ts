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
import {
  EMPLOYMENT,
  HOME_ADDRESS_PROFILE,
  IStepper,
} from "src/app/core/static/auth.static";
import { homeAdressSchema } from "src/app/core/joiSchema/auth.schema";
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
      #stepper
      [orientation]="(stepperOrientation | async)!">
      <mat-step *ngFor="let stepper of steppers; index as i">
        <ng-template matStepLabel>{{ stepper.label }}</ng-template>
        <h2>{{ stepper.title }}</h2>
        <p>{{ stepper.subTitle }}</p>
        <form-input-list-component
          [formInputList]="stepper.formInput"
          errorLocation="AuthModule.YourAccountController"
          [validatorSchema]="stepper.formValidate"
          buttonName="Save"
          (formValue)="save($event, i)"></form-input-list-component
      ></mat-step>
    </mat-stepper>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSignUpController {
  @ViewChild("stepper") private myStepper!: MatStepper;
  public steppers: IStepper = [
    {
      label: "Fill out your address",
      title: "Welcome, What's your location ?",
      subTitle: "Build your business connection in your local area",
      formInput: HOME_ADDRESS_PROFILE,
      formValidate: homeAdressSchema,
    },
    {
      label: "Fill out your employment",
      title: "What's your latest employment",
      subTitle: "Your profile helps you discover new opportunities",
      formInput: EMPLOYMENT,
      formValidate: homeAdressSchema,
    },
  ];
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
      this._router.navigate(["/users", "me", "posts"]);
    }
  }
}
