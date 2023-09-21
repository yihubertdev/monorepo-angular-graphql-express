import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { AddTextEditorControllerComponent } from "./controller/add-text-editor.controller";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { TextEditorOptionsComponent } from "./controller/text-editor-options.controller";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AddTextEditorControllerComponent, TextEditorOptionsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    RouterModule,
  ],
  exports: [AddTextEditorControllerComponent, TextEditorOptionsComponent],
})
export class AddTextEditorModule {}
