import { Component, Input, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";

export enum EQUITY_TITLE {
  ASSETS = "ASSETS",
  AMOUNT = "AMOUNT",
  LIABILITIES = "LIABILITIES",
  EXPENSE = "EXPENSE",
}

export enum NET_INCOME_TITLE {
  INCOME = "INCOME",
  AMOUNT = "AMOUNT",
  EXPENSES = "EXPENSES",
  COST = "COST",
}

@Component({
  standalone: true,
  selector: "net-worth-list-component",
  imports: [MatTableModule],
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
          mat-cell
          *matCellDef="let element">
          {{ element[item] }}
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
  styleUrls: [],
})
export class NetWorthListComponent implements OnInit {
  @Input({ required: true }) dataSource!: (
    | Record<EQUITY_TITLE, string | number>
    | Record<NET_INCOME_TITLE, string | number>
  )[];
  @Input({ required: true }) dataColumn!: (EQUITY_TITLE | NET_INCOME_TITLE)[];

  ngOnInit() {
    console.log(this.dataColumn);
    console.log(this.dataSource);
  }
}
