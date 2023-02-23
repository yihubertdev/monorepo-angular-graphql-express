import { Directive, Input, OnInit } from "@angular/core";
import { MatGridList } from "@angular/material/grid-list";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

export interface GridColumns {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
@Directive({
  selector: "[attrGridCols]",
})
export class GridColsDirective implements OnInit {
  @Input() attrGridCols: GridColumns = { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 };

  public get cols(): GridColumns {
    return this.attrGridCols;
  }

  public set cols(map: GridColumns) {
    if (map && "object" === typeof map) {
      this.attrGridCols = map;
    }
  }

  public constructor(private gridListElement: MatGridList, private breakpointObserver: BreakpointObserver) {
    if (this.gridListElement != null) {
      this.gridListElement.cols = this.attrGridCols.md;
    }
  }

  public ngOnInit(): void {
    if (this.gridListElement != null) {
      this.gridListElement.cols = this.attrGridCols.md;
    }
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridListElement.cols = this.attrGridCols.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.gridListElement.cols = this.attrGridCols.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.gridListElement.cols = this.attrGridCols.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.gridListElement.cols = this.attrGridCols.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridListElement.cols = this.attrGridCols.xl;
        }
      });
  }
}
