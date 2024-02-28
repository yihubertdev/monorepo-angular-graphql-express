import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: "audio-call-controller",
  template: `
    <a
      mat-raised-button
      (click)="openMedia()">
      join
    </a>
  `,
})
export class AudioCallerController {
  public openMedia() {
    const constraints = {
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log("Got MediaStream:", stream);
        stream.getTracks().forEach((track) => console.log(track));
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }
}
