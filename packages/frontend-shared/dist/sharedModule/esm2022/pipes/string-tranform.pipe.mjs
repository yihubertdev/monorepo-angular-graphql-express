import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
export class StringTransformPipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXRyYW5mb3JtLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJyYXJ5L3VpL3NyYy9waXBlcy9zdHJpbmctdHJhbmZvcm0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFNcEQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixTQUFTLENBQ1AsS0FBeUIsRUFDekIsR0FBVyxFQUNYLFNBQThCO1FBRTlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNuRSxDQUFDOzZFQVBVLG1CQUFtQjtrRkFBbkIsbUJBQW1COztpRkFBbkIsbUJBQW1CO2NBSi9CLElBQUk7ZUFBQztnQkFDSixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsSUFBSSxFQUFFLGlCQUFpQjthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AUGlwZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIG5hbWU6IFwic3RyaW5nVHJhbnNmb3JtXCIsXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1RyYW5zZm9ybVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKFxuICAgIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgaXNEaXNwbGF5OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHJldHVybiAhaXNEaXNwbGF5ID8gYCR7a2V5fTogJHt2YWx1ZSA/PyBcIk5VTExcIn1gIDogYCR7a2V5fTogTi9BYDtcbiAgfVxufVxuIl19