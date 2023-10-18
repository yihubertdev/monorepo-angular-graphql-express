import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterController } from "./controller/footer.controller";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import { MainMenuController } from "./controller/main.controller";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { HeaderMenuController } from "./controller/header.controller";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { FooterMenuController } from "./controller/footer-menu.controllers";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [FooterController, HeaderMenuController, FooterMenuController],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  exports: [FooterMenuController, HeaderMenuController, FooterController],
})
export class MenuModule {}
