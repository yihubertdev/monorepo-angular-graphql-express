import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { environment } from "src/environments/environment";

const apiKey = environment.googleCloudApiKey;
export const youtubeVideoValidateURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=`;

@Injectable({
  providedIn: "root",
})
export class GoogleHttpService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string}id youtube video id
   * @returns {Promise<object>} status of the youtube video
   */
  validateYoutubeVideo(id: string): Promise<object> {
    return firstValueFrom(this.http.get(`${youtubeVideoValidateURL}${id}`));
  }
}
