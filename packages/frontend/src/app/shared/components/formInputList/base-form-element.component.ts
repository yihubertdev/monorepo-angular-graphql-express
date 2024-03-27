import { Directive, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { IForm } from "src/app/core/static/form.static";

@Directive()
export class FormElementComponent {
  @Input({ required: true }) formElement!: IForm;
  @Input({ required: true }) form!: UntypedFormGroup;

  public isHide: boolean = true;
}
