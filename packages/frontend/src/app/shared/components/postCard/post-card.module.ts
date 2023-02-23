import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { FormInputListComponent } from "./post-card.component";

@NgModule({
  declarations: [FormInputListComponent],
  imports: [CommonModule, MatExpansionModule, ReactiveFormsModule, MatInputModule],
  exports: [FormInputListComponent],
})
export class FormInputListModule {}
