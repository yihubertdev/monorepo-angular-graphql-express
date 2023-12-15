import * as i0 from '@angular/core';
import { Pipe } from '@angular/core';

class StringTransformPipe {
    transform(value, key, isDisplay) {
        return !isDisplay ? `${key}: ${value ?? "NULL"}` : `${key}: N/A`;
    }
    static ɵfac = function StringTransformPipe_Factory(t) { return new (t || StringTransformPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "stringTransform", type: StringTransformPipe, pure: true, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StringTransformPipe, [{
        type: Pipe,
        args: [{
                standalone: true,
                name: "stringTransform",
            }]
    }], null, null); })();

class UserPhotoPipe {
    transform(photoURL) {
        return photoURL ?? "https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/profiles%2Fprofile-CaOTPL0jHQfPAcehSVlfCcEFNAN2.png?alt=media&token=3565cc80-420f-4f22-b642-bb1885fb2982" /* DEFAULT_CONSTANTS.DEFAULT_USER_PHOTO */;
    }
    static ɵfac = function UserPhotoPipe_Factory(t) { return new (t || UserPhotoPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "defaultUserPhoto", type: UserPhotoPipe, pure: true, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserPhotoPipe, [{
        type: Pipe,
        args: [{
                standalone: true,
                name: "defaultUserPhoto",
            }]
    }], null, null); })();

class LinkPreviewPipe {
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

/*
 * Public Pipes of Surface UI
 */
/*
 * Public Components of Surface UI
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LinkPreviewPipe, StringTransformPipe, UserPhotoPipe };
//# sourceMappingURL=angular-shared-ui.mjs.map
