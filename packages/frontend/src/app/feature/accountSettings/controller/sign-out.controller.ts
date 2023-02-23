import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/fireAuth/auth";

@Component({
  selector: "sign-out-controller",
  template: ` <button mat-raised-button color="primary" (click)="signout()">Sign Out</button>`,
  styleUrls: [],
})
export class SignOutControllerComponent implements OnInit {
  constructor(private authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    const i = 1;
  }

  async signout() {
    await this.authService.logout();
    this._router.navigateByUrl("/account/login");
  }
}
