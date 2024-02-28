import { Component } from "@angular/core";
import { AudioCallerController } from "../../feature/room/audio-call.controller";

@Component({
  standalone: true,
  imports: [AudioCallerController],
  template: ` <div style="height: 100dvh;">
    <audio-call-controller></audio-call-controller>
  </div>`,
  styleUrls: [],
})
export default class RoomView {}
