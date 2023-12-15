import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
export class UserPhotoPipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1waG90by5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicmFyeS91aS9zcmMvcGlwZXMvZGVmYXVsdC1waG90by5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU9wRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixTQUFTLENBQUMsUUFBNEI7UUFDcEMsT0FBTyxRQUFRLCtOQUF3QyxDQUFDO0lBQzFELENBQUM7dUVBSFUsYUFBYTttRkFBYixhQUFhOztpRkFBYixhQUFhO2NBSnpCLElBQUk7ZUFBQztnQkFDSixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsSUFBSSxFQUFFLGtCQUFrQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgREVGQVVMVF9DT05TVEFOVFMgfSBmcm9tIFwic291cmNlcy10eXBlc1wiO1xuXG5AUGlwZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIG5hbWU6IFwiZGVmYXVsdFVzZXJQaG90b1wiLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUGhvdG9QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShwaG90b1VSTDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHBob3RvVVJMID8/IERFRkFVTFRfQ09OU1RBTlRTLkRFRkFVTFRfVVNFUl9QSE9UTztcbiAgfVxufVxuIl19