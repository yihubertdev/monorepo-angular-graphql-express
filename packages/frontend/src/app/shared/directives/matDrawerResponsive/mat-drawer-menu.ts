import { Directive, Input, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDrawer } from "@angular/material/sidenav";
import { map } from "rxjs";

export interface OpenedStatus {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}
@Directive({
  selector: "[attrOpenedStatus]",
})
export class MatDrawerMenuDirective implements OnInit {
  @Input() attrOpenedStatus: OpenedStatus = {
    xs: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  };

  public constructor(
    private matDrawerElement: MatDrawer,
    private breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit(): void {
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
        if (breakpoints[Breakpoints.XSmall]) {
          this.matDrawerElement.opened = this.attrOpenedStatus.xs;
        }
        if (breakpoints[Breakpoints.Small]) {
          this.matDrawerElement.opened = this.attrOpenedStatus.sm;
        }
        if (breakpoints[Breakpoints.Medium]) {
          this.matDrawerElement.opened = this.attrOpenedStatus.md;
        }
        if (breakpoints[Breakpoints.Large]) {
          this.matDrawerElement.opened = this.attrOpenedStatus.lg;
        }
        if (breakpoints[Breakpoints.XLarge]) {
          this.matDrawerElement.opened = this.attrOpenedStatus.xl;
        }
      });
  }
}
