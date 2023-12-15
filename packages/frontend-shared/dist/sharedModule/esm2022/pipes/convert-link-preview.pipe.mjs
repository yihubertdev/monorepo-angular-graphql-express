import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
export class LinkPreviewPipe {
    _urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    _tranformURL(value) {
        return value.replace(this._urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank">' + url + "</a>";
        });
    }
    transform(value, key, isDisplay) {
        return value ? this._tranformURL(value) : "";
    }
    static ɵfac = function LinkPreviewPipe_Factory(t) { return new (t || LinkPreviewPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "linkPreview", type: LinkPreviewPipe, pure: true, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkPreviewPipe, [{
        type: Pipe,
        args: [{
                name: "linkPreview",
                standalone: true,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1saW5rLXByZXZpZXcucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnJhcnkvdWkvc3JjL3BpcGVzL2NvbnZlcnQtbGluay1wcmV2aWV3LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxlQUFlO0lBQ2xCLFNBQVMsR0FDZiw2RUFBNkUsQ0FBQztJQUV4RSxZQUFZLENBQUMsS0FBYTtRQUNoQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEdBQUc7WUFDaEQsT0FBTyxXQUFXLEdBQUcsR0FBRyxHQUFHLG9CQUFvQixHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sU0FBUyxDQUFDLEtBQWMsRUFBRSxHQUFZLEVBQUUsU0FBbUI7UUFDaEUsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvQyxDQUFDO3lFQVpVLGVBQWU7OEVBQWYsZUFBZTs7aUZBQWYsZUFBZTtjQUozQixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxJQUFJO2FBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgbmFtZTogXCJsaW5rUHJldmlld1wiLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBMaW5rUHJldmlld1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBfdXJsUmVnZXggPVxuICAgIC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvZ2k7XG5cbiAgcHJpdmF0ZSBfdHJhbmZvcm1VUkwodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHRoaXMuX3VybFJlZ2V4LCBmdW5jdGlvbiAodXJsKSB7XG4gICAgICByZXR1cm4gJzxhIGhyZWY9XCInICsgdXJsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyB1cmwgKyBcIjwvYT5cIjtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU/OiBzdHJpbmcsIGtleT86IHN0cmluZywgaXNEaXNwbGF5PzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlID8gdGhpcy5fdHJhbmZvcm1VUkwodmFsdWUpIDogXCJcIjtcbiAgfVxufVxuIl19