import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IMenu } from "src/app/core/models/layout.type";
import { homePageMenus } from "src/app/core/static/post.static";

@Component({
  selector: "header-menu-controller",
  template: ` <ng-container>
    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>

    <mat-menu #vertebrates="matMenu">
      <button mat-menu-item>Birds</button>
      <button mat-menu-item>Mammals</button>
    </mat-menu>

    <mat-menu #invertebrates="matMenu">
      <button mat-menu-item>Insects</button>
      <button mat-menu-item>Molluscs</button>
      <button mat-menu-item>Crustaceans</button>
      <button mat-menu-item>Corals</button>
      <button mat-menu-item>Arachnids</button>
      <button mat-menu-item>Velvet worms</button>
      <button mat-menu-item>Horseshoe crabs</button>
    </mat-menu>

    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>

    <button
      mat-button
      [matMenuTriggerFor]="animals">
      Bla
    </button>
    <mat-menu #animals="matMenu">
      <button
        mat-menu-item
        [matMenuTriggerFor]="vertebrates">
        Vertebrates
      </button>
      <button
        mat-menu-item
        [matMenuTriggerFor]="invertebrates">
        Invertebrates
      </button>
    </mat-menu>
  </ng-container>`,
  styleUrls: [],
})
export class HeaderMenuController {
  footerIconLayout: IMenu[] = homePageMenus;

  constructor(private router: Router) {}
}
