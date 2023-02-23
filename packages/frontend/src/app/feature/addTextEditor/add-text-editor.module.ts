import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { AddTextEditorControllerComponent } from "./controller/add-text-editor.controller";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { TextEditorOptionsComponent } from "./controller/text-editor-options.controller";

@NgModule({
  declarations: [AddTextEditorControllerComponent, TextEditorOptionsComponent],
  imports: [CommonModule, MatIconModule, MatBottomSheetModule, MatListModule],
  exports: [AddTextEditorControllerComponent, TextEditorOptionsComponent],
})
export class AddTextEditorModule {}
