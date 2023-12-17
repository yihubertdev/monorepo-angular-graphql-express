import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgIf, NgStyle } from "@angular/common";
import { FormInputListComponent } from "../formInputList/form-input-list.component";
import { IUser } from "sources-types";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "profile-card-component",
  imports: [NgIf, NgStyle, MatCardModule, FormInputListComponent],
  template: ` <mat-card style="border-radius: initial;">
    <mat-card-header>
      <mat-card-title style="display: inline !important;"
        >{{ currentUser.displayName }}
      </mat-card-title>
      <mat-card-subtitle style="display: inline !important;"
        >&#64;{{ currentUser.userId }}</mat-card-subtitle
      >
    </mat-card-header>

    <mat-card-content>
      <!--content-->
      <p
        #content
        class="text-overflow-card"
        [ngStyle]="{ display: isShowMore ? 'block' : '-webkit-box' }"
        [innerHTML]="currentUser.description"></p>
      <p
        *ngIf="content.scrollHeight > 100"
        class="cursor-pointer"
        (click)="isShowMore = !isShowMore"
        style="text-align: right;">
        {{ isShowMore ? "Show Less" : "Show More" }}
      </p></mat-card-content
    >
  </mat-card>`,
  styleUrls: ["./post-card.component.css"],
})
export class ProfileCardComponent {
  @Input() currentUser!: IUser;

  public isShowMore: boolean = false;
}
