import { Component, OnInit } from "@angular/core";
import { accountSchema } from "src/app/core/joiSchema/auth.schema";
import { IFormInput } from "src/app/core/models/view.types";
import { yourAccountFormList } from "src/app/core/static/auth.static";

@Component({
  selector: "account-setting-controller",
  template: `
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
      <br />
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> You Account 1 </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="mat-expansion-panel-content">
          <form-input-list-component
            [formInputList]="formInputList"
            errorLocation="AuthModule.YourAccountController"
            [validatorSchema]="accountSchema"
            buttonName="Save"
            (formValue)="save($event)"></form-input-list-component>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ["../account-settings.style.css"],
})
export class AccountSettingControllerComponent implements OnInit {
  panelOpenState = false;
  accountSchema: any;
  formInputList: IFormInput[];
  constructor() {
    this.formInputList = yourAccountFormList;
    this.accountSchema = accountSchema;
  }
  ngOnInit(): void {
    const i = 1;
  }

  save(formValue: Record<string, number | string>) {
    console.log(formValue);
  }
}
