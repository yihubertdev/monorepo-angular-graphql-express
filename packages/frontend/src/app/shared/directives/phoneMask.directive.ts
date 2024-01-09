import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";

@Directive({
  standalone: true,
  selector: "[attrPhoneMask]",
})
export class PhoneMaskDirective {
  private _phoneInput$: Subject<string> = new Subject<string>();
  constructor(private _ngControl: NgControl) {
    this._phoneInput$
      .pipe(
        debounceTime(500) // phone number convert set delay time to wait user finish input
      )
      .subscribe((value) => {
        let newVal = value.replace(/\D/g, "");
        if (newVal.length === 0) {
          newVal = "";
        } else if (newVal.length <= 3) {
          newVal = newVal.replace(/^(\d{0,3})/, "($1)");
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
        } else if (newVal.length <= 10) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
        } else {
          newVal = newVal.substring(0, 10);
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
        }
        this._ngControl.valueAccessor!.writeValue(newVal);
      });
  }

  @HostListener("ngModelChange", ["$event"])
  onModelChange(number: string) {
    this._phoneInput$.next(number);
  }

  @HostListener("keydown.backspace", ["$event"])
  keydownBackspace(event: Event) {
    this._phoneInput$.next((event.target as HTMLInputElement).value);
  }
}
