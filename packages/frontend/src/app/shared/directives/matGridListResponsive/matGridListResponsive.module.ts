import { NgModule } from "@angular/core";
import { GridColsDirective } from "./gridColumns";
import { GridColSpanDirective } from "./grildColSpan";

@NgModule({
  declarations: [GridColsDirective, GridColSpanDirective],
  imports: [],
  exports: [GridColsDirective, GridColSpanDirective],
})
export class GridListResponsiveDirectiveModule {}
