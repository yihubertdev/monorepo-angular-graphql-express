import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RoomService } from "../../core/services/fireStore/room.firestore";
import { IRoom, IUser, ROOM_TYPE } from "type-sources";
import { DocumentReference } from "@angular/fire/compat/firestore";
import { ActivatedRoute } from "@angular/router";
import { TURNService } from "../../core/services/fireStore/turn.firestore";

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: "audio-call-controller",
  template: `
    <video
      #audioRemote
      autoplay></video>
    <a
      mat-raised-button
      (click)="create()">
      create room
    </a>
    <a
      mat-raised-button
      (click)="sendOffer()">
      send offer
    </a>
    <a
      mat-raised-button
      (click)="joinRoom()">
      join room
    </a>
    <a
      mat-raised-button
      (click)="sendMessage()">
      send
    </a>
  `,
})
export class AudioCallerController implements OnInit {
  @ViewChild("audioTest") audioTest!: ElementRef;
  @ViewChild("audioRemote") audioRemote!: ElementRef;
  public remoteStream?: MediaStream;
  public user!: IUser;
  public room!: DocumentReference<IRoom.IBase>;
  public peerConnection!: RTCPeerConnection;
  public dataChannel!: RTCDataChannel;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private turnService: TURNService
  ) {}

  async ngOnInit() {
    const { user, room } = this.route.snapshot.data;

    this.user = user;
    this.room = room;

    const [TURNConfig] = await this.turnService.retrieveAll();

    this.peerConnection = new RTCPeerConnection({
      iceServers: TURNConfig.iceServers,
    });

    this.roomService
      .listenOffer({
        room: this.room,
        userId: this.user.userId,
      })
      .onSnapshot((offer) => {
        offer.docChanges().forEach(async (item) => {
          const rtc = item.doc.data() as IRoom.IOffer;
          console.log("this is offer");
          console.log(rtc);
          if (rtc) {
            // const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            // localStream.getTracks().forEach(track => {
            //   this.peerConnection.addTrack(track, localStream);
            // });

            // this.peerConnection.ontrack = (event) => {
            //   console.log(event.streams[0])
            //   const [remoteStream] = event.streams;
            //   this.audioRemote.nativeElement.srcObject = remoteStream;
            // };

            this.peerConnection.ondatachannel = (event) => {
              const received = event.channel;
              received.onmessage = (data) => {
                console.log(data);
              };
            };

            this.peerConnection.onicecandidate = async (event) => {
              if (event.candidate) {
                await this.roomService.sendICE({
                  room: this.room!,
                  ICE: {
                    userId: this.user!.userId,
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
            const remoteDesc = new RTCSessionDescription(rtc.config);
            await this.peerConnection.setRemoteDescription(remoteDesc);
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            this.roomService
              .listenICE({
                room: this.room,
                userId: this.user.userId,
              })
              .onSnapshot((offer) => {
                offer.docChanges().forEach(async (item) => {
                  const rtc = item.doc.data() as IRoom.ICE;
                  console.log("this is ice");
                  console.log(rtc);
                  if (rtc) {
                    await this.peerConnection.addIceCandidate(rtc.candidate);
                  }
                });
              });
            await this.roomService.sendAnswer({
              room: this.room!,
              answer: {
                userId: this.user!.userId,
                config: {
                  sdp: answer.sdp,
                  type: answer.type,
                },
              },
            });
          }
        });
      });

    this.roomService
      .listenAnswer({
        room: this.room,
        userId: this.user.userId,
      })
      .onSnapshot((offer) => {
        offer.docChanges().forEach(async (item) => {
          const rtc = item.doc.data() as IRoom.IOffer;
          console.log("this is answer");
          console.log(rtc);
          if (rtc) {
            const remoteDesc = new RTCSessionDescription(rtc.config);
            await this.peerConnection.setRemoteDescription(remoteDesc);
            this.roomService
              .listenICE({
                room: this.room,
                userId: this.user.userId,
              })
              .onSnapshot((offer) => {
                offer.docChanges().forEach(async (item) => {
                  const rtc = item.doc.data() as IRoom.ICE;
                  console.log("this is ice");
                  console.log(rtc);
                  if (rtc) {
                    // add ice candidate trigger after set remote description
                    await this.peerConnection.addIceCandidate(rtc.candidate);
                  }
                });
              });
          }
        });
      });
  }

  public async create() {
    const room = {
      enabled: true,
      type: ROOM_TYPE.BASIC,
    };

    const document = this.roomService.serializer(room);
    await this.roomService.createRoom({ document });
  }

  public async sendOffer() {
    if (!this.room || !this.user) {
      return;
    }

    this.dataChannel.onmessage = (event) => {
      console.log(event);
    };
    // const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // localStream.getTracks().forEach(track => {
    //   this.peerConnection.addTrack(track, localStream);
    // });
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    await this.roomService.sendOffer({
      room: this.room,
      offer: {
        userId: this.user.userId,
        config: {
          sdp: offer.sdp,
          type: offer.type,
        },
      },
    });
    // onicecandidate trigger after setLocalDescription called
    this.peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        await this.roomService.sendICE({
          room: this.room!,
          ICE: {
            userId: this.user!.userId,
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

    this.peerConnection.ontrack = (event) => {
      console.log(event.streams[0]);
      const [remoteStream] = event.streams;
      this.audioRemote.nativeElement.srcObject = remoteStream;
    };

    this.peerConnection.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`
      );
    });

    this.peerConnection.addEventListener("connectionstatechange", () => {
      console.log(
        `Connection state change: ${this.peerConnection.connectionState}`
      );
    });

    this.peerConnection.addEventListener("signalingstatechange", () => {
      console.log(
        `Signaling state change: ${this.peerConnection.signalingState}`
      );
    });

    this.peerConnection.addEventListener("iceconnectionstatechange", () => {
      console.log(
        `ICE connection state change: ${this.peerConnection.iceConnectionState}`
      );
    });

    // this.dataChannel.send("test");
  }

  async joinRoom() {
    if (!this.room || !this.user) {
      return;
    }

    this.peerConnection.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`
      );
    });

    this.peerConnection.addEventListener("connectionstatechange", () => {
      console.log(
        `Connection state change: ${this.peerConnection.connectionState}`
      );
    });

    this.peerConnection.addEventListener("signalingstatechange", () => {
      console.log(
        `Signaling state change: ${this.peerConnection.signalingState}`
      );
    });

    this.peerConnection.addEventListener("iceconnectionstatechange", () => {
      console.log(
        `ICE connection state change: ${this.peerConnection.iceConnectionState}`
      );
    });
  }

  async sendMessage() {
    this.dataChannel.send("this is a test");
  }
}
