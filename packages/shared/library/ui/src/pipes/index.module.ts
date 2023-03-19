import { NgModule } from "@angular/core";
import { StringTransformPipe } from "./string-tranform.pipe";

@NgModule({
  declarations: [StringTransformPipe],
  exports: [StringTransformPipe],
})
export class StringTransformPipeModule {}
