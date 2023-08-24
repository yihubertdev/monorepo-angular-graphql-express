import { NgModule } from "@angular/core";
import { StringTransformPipe, UserPhotoPipe } from "./string-tranform.pipe";

@NgModule({
  declarations: [StringTransformPipe, UserPhotoPipe],
  exports: [StringTransformPipe, UserPhotoPipe],
})
export class StringTransformPipeModule {}
