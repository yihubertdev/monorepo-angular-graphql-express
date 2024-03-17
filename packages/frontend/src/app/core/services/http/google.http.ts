import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { environment } from "src/environments/environment.dev";

const apiKey = environment.googleCloudApiKey;
export const youtubeVideoValidateURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=`;

@Injectable({
  providedIn: "root",
})
export class GoogleHttpService {
  constructor(private http: HttpClient) { }

  /**
   *
   * @param {string}id youtube video id
   * @returns {Promise<object>} status of the youtube video
   */
  validateYoutubeVideo(id: string): Promise<object> {
    return firstValueFrom(this.http.get(`${youtubeVideoValidateURL}${id}`));
  }

  async getTURNServerConfig(): Promise<RTCIceServer[]> {
    return firstValueFrom(this.http.get(`https://yoohoo.metered.live/api/v1/turn/credentials?apiKey=569bd5cbf80879b021147fc620c93a953c94`)) as unknown as Promise<RTCIceServer[]>;
  }
}
