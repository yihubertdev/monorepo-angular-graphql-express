import { Component, ViewChild } from "@angular/core";
import {
  MatStepper,
  MatStepperModule,
  StepperOrientation,
} from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { Observable, map } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { FormInputListComponent } from "src/app/shared/components/formInputList/form-input-list.component";
import { HOME_ADDRESS_PROFILE } from "src/app/core/static/auth.static";
import { homeAdressSchema } from "src/app/core/joiSchema/auth.schema";

@Component({
  standalone: true,
  imports: [
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
      <mat-step>
        <h2>Welcome, What's your location ?</h2>
        <p>Build your business connection in your local area</p>
        <form-input-list-component
          [formInputList]="formInputList"
          errorLocation="AuthModule.YourAccountController"
          [validatorSchema]="formInputSchema"
          buttonName="Save"
          (formValue)="save($event)"></form-input-list-component
      ></mat-step>
      <mat-step label="Fill out your address">
        <div>
          <button
            mat-button
            matStepperPrevious>
            Back
          </button>
          <button
            mat-button
            matStepperNext>
            Next
          </button>
        </div>
      </mat-step>
      <mat-step>
        <div>
          <button
            mat-button
            matStepperPrevious>
            Back
          </button>
        </div>
      </mat-step>
    </mat-stepper>
  `,
  styleUrls: ["./user-profile.style.css"],
})
export class UserProfileSignUpController {
  @ViewChild("stepper") private myStepper!: MatStepper;

  stepperOrientation: Observable<StepperOrientation>;

  formInputList = HOME_ADDRESS_PROFILE;
  formInputSchema = homeAdressSchema;
  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  save(value: any) {
    console.log(value);
    this.myStepper.next();
  }
}
