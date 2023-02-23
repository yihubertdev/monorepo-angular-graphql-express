import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchViewComponent } from "./view/search.view";
import { SearchRoutingModule } from "./search-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [SearchViewComponent],
  imports: [CommonModule, SearchRoutingModule, MatGridListModule, MatCardModule],
  exports: [SearchViewComponent],
})
export class SearchModule {}
