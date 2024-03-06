import { Component, ElementRef, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: "audio-call-controller",
  template: `
    <audio #audioTest autoplay></audio>

    <audio #audioRemote autoplay></audio>
    <a
      mat-raised-button
      (click)="openMedia()">
      join
    </a>
  `,
})
export class AudioCallerController {
  @ViewChild("audioTest") audioTest!: ElementRef;
  @ViewChild("audioRemote") audioRemote!: ElementRef;
  public remoteStream?: MediaStream;
  public async openMedia() {
    const constraints = {
      audio: true,
    };
    const stream = await navigator.mediaDevices
      .getUserMedia(constraints);
      console.log(stream);
    this.audioTest.nativeElement.srcObject = stream;

    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration);

    stream.getTracks().forEach(track=> peerConnection.addTrack(track, stream));

    peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      this.audioRemote.nativeElement.srcObject = this.remoteStream;
    }

    const offer = await peerConnection.createOffer();
  }
}
