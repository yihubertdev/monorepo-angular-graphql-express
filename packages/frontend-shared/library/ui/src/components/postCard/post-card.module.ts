import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostCardComponent } from "./post-card.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { StringTransformPipeModule } from "../../pipes/index.module";

@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    StringTransformPipeModule
  ],
  exports: [PostCardComponent],
})
export class PostCardModule {}
