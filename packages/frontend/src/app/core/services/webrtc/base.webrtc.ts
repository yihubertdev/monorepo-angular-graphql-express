import { inject } from "@angular/core";
import { RoomService } from "../fireStore/room.firestore";
import { IRoom } from "type-sources";
import { DocumentReference } from "@angular/fire/compat/firestore";

export class WebRTC {
  public peerConnection: RTCPeerConnection;
  public localStream?: MediaStream;
  public remoteStream: MediaStream;
  public dataChannel?: RTCDataChannel;

  constructor(RTCIceServer: RTCIceServer[]) {
    this.peerConnection = new RTCPeerConnection({
      iceServers: RTCIceServer,
    });

    this.peerConnection.onicegatheringstatechange = () => {
      console.log(
        `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`
      );
    };

    this.peerConnection.onconnectionstatechange = () => {
      console.log(
        `Connection state change: ${this.peerConnection.connectionState}`
      );
    };

    this.peerConnection.onsignalingstatechange = () => {
      console.log(
        `Signaling state change: ${this.peerConnection.signalingState}`
      );
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state change: ${this.peerConnection.iceConnectionState}`
      );
    };

    this.remoteStream = new MediaStream();
  }
  // Step 1, get user media for local and remote stream
  async getUserMedia(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream!);
    });

    this.peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      this.remoteStream = remoteStream;
    };
  }

  createDataChannel(channel: string) {
    this.dataChannel = this.peerConnection.createDataChannel(channel);

    this.dataChannel.addEventListener("open", () => {
      console.log("data channel open");
    });
  }

  // Step 2, onicecandidate trigger after setLocalDescription called, declare it before calling setLocal
  async listenICECandidate(
    room: DocumentReference<IRoom.IBase>,
    userId: string
  ) {
    this.peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        await inject(RoomService).sendICE({
          room,
          ICE: {
            userId,
            candidate: {
              candidate: event.candidate.candidate,
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              sdpMid: event.candidate.sdpMid,
              usernameFragment: event.candidate.usernameFragment,
            },
          },
        });
      }
    };
  }

  // Step 3, create offer for peer connection
  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  // Step 4, create answer for peer connection
  async createAnswer(
    rtcConfig: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit> {
    const remoteDesc = new RTCSessionDescription(rtcConfig);
    await this.peerConnection.setRemoteDescription(remoteDesc);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }
}
