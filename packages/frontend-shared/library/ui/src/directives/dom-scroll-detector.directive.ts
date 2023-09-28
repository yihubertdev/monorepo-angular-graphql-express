import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
  selector: "[domScroll]",
})
export class DomScrollDirective {
  // this will emit the scroll update to whatever you want to assign with its emitted value
  @Output() windowScroll: EventEmitter<any> = new EventEmitter<any>();

  @HostListener("window:scroll", ["event"]) onWindowScroll(event: any) {
    this.windowScroll.next(event); // use the @output() windowscroll to emit a simple string 'scrolled' whenever the window triggers a scroll event from the user
  }
}
