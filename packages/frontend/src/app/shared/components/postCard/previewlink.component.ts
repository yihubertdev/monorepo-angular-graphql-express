import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

export interface ILinkPreview {
  description: string;
  image: string;
  title: string;
  url: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
  ],
  selector: "preview-link-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mat-card>
    <mat-card-header>
      <mat-card-title-group>
        <mat-card-subtitle
          ><a
            [href]="url"
            target="_blank"
            >{{ preview!.url }}</a
          ></mat-card-subtitle
        >

        <mat-card-title>{{ preview!.title }}</mat-card-title>
        <img
          mat-card-sm-image
          [src]="preview!.image" />
      </mat-card-title-group>
    </mat-card-header>
    <mat-card-content> {{ preview!.description }} </mat-card-content>
  </mat-card>`,
  styleUrls: ["./post-card.component.css"],
})
export class PreviewLinkComponent implements OnInit {
  @Input() url?: string[];

  public preview?: ILinkPreview;
  public isShow: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.url) return;
    this.http.get(this.url[0]).subscribe({
      next: (data: any) => {
        this.isShow = true;
        this.preview = data;
      },
      error: () => {
        this.isShow = true;
        console.log(this.isShow);
        this.preview = {
          description: "failed",
          image: "failed",
          title: "failed",
          url: "failed",
        };
      },
    });
  }
}
