import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterMenuController } from "./controller/footer.controller";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import { MainMenuController } from "./controller/main.controller";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { HeaderMenuController } from "./controller/header.controller";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    FooterMenuController,
    MainMenuController,
    HeaderMenuController,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [FooterMenuController, MainMenuController, HeaderMenuController],
})
export class MenuModule {}
