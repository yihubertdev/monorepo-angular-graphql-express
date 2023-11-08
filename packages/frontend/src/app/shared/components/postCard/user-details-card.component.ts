import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { IFormInput, IUser } from "sources-types";
import { JoiSchemaBuilder } from "../../../core/utils/validator";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddProfileSectionDialog } from "../../dialog/add-profile-section.dialog";
import { MatIconModule } from "@angular/material/icon";

export interface IUserDetailCard {
  details: any;
  documentId?: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "user-details-card-component",
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
  ],
  template: `<mat-card
    *ngIf="userDetails"
    class="m-4">
    <mat-card-header>
      <mat-card-title *ngIf="isSettingsPage && category !== 'account'">
        <a
          mat-button
          (click)="openDialog()">
          Edit
          <mat-icon>edit</mat-icon>
        </a>
        <a
          mat-button
          (click)="
            remove({
              documentId: userDetails.documentId!,
              category: this.category
            })
          ">
          Remove
          <mat-icon>delete</mat-icon>
        </a></mat-card-title
      >
    </mat-card-header>
    <mat-card-content>
      <mat-list>
        <div class="row">
          <div
            class="col-xl-6 col-lg-6
              col-md-6 col-sm-12 col-xs-12"
            *ngFor="let info of formList">
            <mat-list-item
              *ngIf="info.type === 'text' || info.type === 'select'"
              >{{ info.label }} : {{ info.value }}</mat-list-item
            >
            <mat-list-item *ngIf="info.type === 'upload'"
              >{{ info.label }}

              <a
                mat-button
                [href]="info.value[0]"
                target="_blank">
                View
                <mat-icon>visibility</mat-icon>
              </a>
              <a
                mat-button
                [href]="info.value[0]"
                target="_blank">
                Save
                <mat-icon>download</mat-icon>
              </a>
            </mat-list-item>
            <mat-divider></mat-divider>
          </div>
        </div>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
})
export class UserDetailCardComponent implements OnChanges {
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
  }>();

  constructor(public dialog: MatDialog) {}

  ngOnChanges() {
    this.formList.forEach(
      (list) => (list.value = this.userDetails.details[list.key])
    );
  }

  openDialog() {
    this.formList.forEach(
      (list) => (list.value = this.userDetails.details[list.key])
    );
    this.dialog.open(AddProfileSectionDialog, {
      disableClose: true,
      data: {
        user: this.user,
        category: this.category,
        title: this.title,
        documentId: this.userDetails.documentId,
        formList: this.formList,
        formSchema: this.formSchema,
      },
    });
  }

  remove(value: { documentId: string; category: string }) {
    this.removeChange.emit(value);
  }
}
