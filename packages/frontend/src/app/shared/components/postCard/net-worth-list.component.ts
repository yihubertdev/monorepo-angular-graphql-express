import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { SlicePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { map } from "rxjs";

export enum EQUITY_TITLE {
  ASSETS = "ASSET",
  AMOUNT = "AMOUNT",
  LIABILITY = "LIABILITY",
  EXPENSES = "EXPENSES",
}

export enum NET_INCOME_TITLE {
  INCOME = "INCOME",
  AMOUNT = "AMOUNT",
  EXPENSE = "EXPENSE",
  COST = "COST",
}

@Component({
  standalone: true,
  selector: "net-worth-list-component",
  imports: [MatTableModule, SlicePipe],
  template: ` <table
    mat-table
    [dataSource]="dataSource"
    class="mat-elevation-z8">
    <!-- Assets Column -->
    @for (item of dataColumn; track $index) {
      <ng-container [matColumnDef]="item">
        <th
          mat-header-cell
          *matHeaderCellDef>
          {{ item }}
        </th>
        <td
          class="show-one-line"
          mat-cell
          *matCellDef="let element">
          @if (
            isMobile &&
            (item === "ASSET" ||
              item === "INCOME" ||
              item === "EXPENSE" ||
              item === "LIABILITY")
          ) {
            {{ element[item] | slice: 0 : 8 }}
          } @else {
            {{ element[item] }}
          }
        </td>
      </ng-container>
    }
    <tr
      mat-header-row
      *matHeaderRowDef="dataColumn"></tr>
    <tr
      mat-row
      *matRowDef="let row; columns: dataColumn"></tr>
  </table>`,
  styles: `
    .show-one-line {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1; /* number of lines to show */
    }
  `,
})
export class NetWorthListComponent implements OnInit {
  @Input({ required: true }) dataSource!: (
    | Record<EQUITY_TITLE, string | number>
    | Record<NET_INCOME_TITLE, string | number>
  )[];
  @Input({ required: true }) dataColumn!: (EQUITY_TITLE | NET_INCOME_TITLE)[];
  public isMobile: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(map((result) => result.breakpoints))
      .subscribe((breakpoints) => {
        switch (true) {
          case breakpoints[Breakpoints.Medium]:
          case breakpoints[Breakpoints.Small]:
          case breakpoints[Breakpoints.XSmall]: {
            this.isMobile = true;
            break;
          }

          case breakpoints[Breakpoints.Large]:
          case breakpoints[Breakpoints.XLarge]:
            this.isMobile = false;
            break;

          default:
            break;
        }
      });
  }
}
