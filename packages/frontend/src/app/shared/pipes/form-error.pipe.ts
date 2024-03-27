import { Pipe, PipeTransform } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Pipe({
  standalone: true,
  name: "formError",
})
export class FormErrorPipe implements PipeTransform {
  transform(key: string, form: UntypedFormGroup): string {
    const formControl = form.get(key);

    return formControl?.errors ? formControl?.errors[key] : "";
  }
}
