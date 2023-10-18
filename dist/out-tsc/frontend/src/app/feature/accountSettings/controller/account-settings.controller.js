"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSettingControllerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const auth_schema_1 = require("src/app/core/joiSchema/auth.schema");
const auth_static_1 = require("src/app/core/static/auth.static");
let AccountSettingControllerComponent = class AccountSettingControllerComponent {
    constructor() {
        this.panelOpenState = false;
        this.formInputList = auth_static_1.yourAccountFormList;
        this.accountSchema = auth_schema_1.accountSchema;
    }
    ngOnInit() {
        const i = 1;
    }
    save(formValue) {
        console.log(formValue);
    }
};
AccountSettingControllerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
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
], AccountSettingControllerComponent);
exports.AccountSettingControllerComponent = AccountSettingControllerComponent;
//# sourceMappingURL=account-settings.controller.js.map