import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { IFormInput, IUser, SETTING_CATEGORY } from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDialog } from "@angular/material/dialog";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { UserService } from "src/app/core/services/fireStore/users.firestore";
import { AuthService } from "src/app/core/services/fireAuth/auth";

export interface IUserDetailCard {
  details: any;
  documentId?: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "user-details-card-component",
  imports: [NgIf, MatCardModule, FormInputListComponent],
  template: `<mat-card *ngIf="userDetails">
    <mat-card-content>
      <form-input-list-component
        [columns]="columns"
        [formInputList]="formList"
        errorLocation="AuthModule.YourAccountController"
        [validatorSchema]="formSchema!"
        buttonName="Save"
        (formValue)="save($event)"></form-input-list-component>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
  @Input({ required: true }) collection!: string;
  @Input({ required: true }) userDetails!: IUserDetailCard;
  @Input({ required: true }) user!: QueryDocumentSnapshot<IUser>;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) formList!: IFormInput[];
  @Input({ required: true }) formSchema?: JoiSchemaBuilder<any>;
  @Input() isSettingsPage?: boolean;

  @Output() removeChange = new EventEmitter<{
    documentId: string;
    category: string;
    title: string;
  }>();

  columns = {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6,
  };
  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnChanges() {
    this.formList.forEach(
      (list) => (list.value = this.userDetails.details[list.key])
    );
  }

  save(value: any) {
    switch (this.category) {
      case SETTING_CATEGORY.ACCOUNT:
        const user = this._authService.getAuth();
        if (!user) return;
        this._authService.updateUserInfo(user, {
          displayName: value.displayName,
        });

        break;
      default:
        this._userService.createSubCollectionByUser(this.user, {
          collectionId: this.collection,
          next: {
            documentId: this.userDetails.documentId,
            documentValue: { category: this.category, ...value },
          },
        });
        break;
    }
  }
}
