import { Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { MatGridTile } from "@angular/material/grid-list";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

export interface GrilColRow {
  colspan: number;
  rowspan: number;
}

export interface GridBreakPoint {
  xs: GrilColRow;
  sm: GrilColRow;
  md: GrilColRow;
  lg: GrilColRow;
  xl: GrilColRow;
}
@Directive({
  selector: "[attrGridColSpan]",
})
export class GridColSpanDirective implements OnInit {
  @Input() attrGridColSpan: GridBreakPoint = {
    xs: {
      colspan: 1,
      rowspan: 1,
    },
    sm: {
      colspan: 2,
      rowspan: 2,
    },
    md: {
      colspan: 4,
      rowspan: 4,
    },
    lg: {
      colspan: 6,
      rowspan: 6,
    },
    xl: {
      colspan: 8,
      rowspan: 8,
    },
  };

  public constructor(
    private gridTileElement: MatGridTile,
    private breakpointObserver: BreakpointObserver
  ) {
    if (this.gridTileElement != null) {
      this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
      this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
    }
  }

  public ngOnInit(): void {
    if (this.gridTileElement != null) {
      this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
      this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
    }
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridTileElement.colspan = this.attrGridColSpan.xs.colspan;
          this.gridTileElement.rowspan = this.attrGridColSpan.xs.rowspan;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.gridTileElement.colspan = this.attrGridColSpan.sm.colspan;
          this.gridTileElement.rowspan = this.attrGridColSpan.sm.rowspan;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.gridTileElement.colspan = this.attrGridColSpan.md.colspan;
          this.gridTileElement.rowspan = this.attrGridColSpan.md.rowspan;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.gridTileElement.colspan = this.attrGridColSpan.lg.colspan;
          this.gridTileElement.rowspan = this.attrGridColSpan.lg.rowspan;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridTileElement.colspan = this.attrGridColSpan.xl.colspan;
          this.gridTileElement.rowspan = this.attrGridColSpan.xl.rowspan;
        }
      });
  }
}
