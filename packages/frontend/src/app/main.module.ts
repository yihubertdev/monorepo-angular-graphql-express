import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RoutingModule } from "./routing.module";
import { MainViewComponent } from "./main.view";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatGridListModule } from "@angular/material/grid-list";
import { MenuModule } from "src/app/feature/menu/menu.module";
import { environment } from "src/environments/environment.dev";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { ServiceModule } from "./core/services/services.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { QuillModule } from "ngx-quill";
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDrawerResponsiveDirectiveModule } from "./shared/directives/matDrawerResponsive/mat-drawer-responsive.module";
import { GridListResponsiveDirectiveModule } from "./shared/directives/matGridListResponsive/matGridListResponsive.module";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HomePagePostModule } from "./feature/homePagePost/home-page-post.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { DomScrollDirectiveModule } from "./shared/directives/domScrollDetector/dom-scroll-detector.module";
import { UserSignalsStateService } from "./core/services/signal/userAuth.signal";
import { BrowserStorageServiceModule } from "./core/services/browserStorage/browserStorage.module";

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MenuModule,
    ServiceModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSidenavModule,
    MatDrawerResponsiveDirectiveModule,
    GridListResponsiveDirectiveModule,
    DomScrollDirectiveModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserStorageServiceModule,
    HomePagePostModule.forChatTopic(),
    QuillModule.forRoot(),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    UserSignalsStateService,
  ],
  bootstrap: [MainViewComponent],
})
export class MainModule {}
