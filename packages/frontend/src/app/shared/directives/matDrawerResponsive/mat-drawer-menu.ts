import { Directive, Input, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDrawer } from "@angular/material/sidenav";
import { map } from "rxjs";
import { MatStepper } from "@angular/material/stepper";
import { MatNavList } from "@angular/material/list";

export interface OpenedStatus {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}
@Directive({
  standalone: true,
  selector: "[attrOpenedStatus]",
})
export class MatDrawerOpenDirective implements OnInit {
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

@Directive({
  standalone: true,
  selector: "[attrResponsiveStepper]",
})
export class ResponsiveStepperDirective implements OnInit {
  public constructor(
    private matStepper: MatStepper,
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
        switch (true) {
          case breakpoints[Breakpoints.Medium]:
          case breakpoints[Breakpoints.Small]:
          case breakpoints[Breakpoints.XSmall]: {
            this.matStepper.orientation = "vertical";
            break;
          }

          case breakpoints[Breakpoints.Large]:
          case breakpoints[Breakpoints.XLarge]: {
            this.matStepper.orientation = "horizontal";
            break;
          }

          default: {
            break;
          }
        }
      });
  }
}
