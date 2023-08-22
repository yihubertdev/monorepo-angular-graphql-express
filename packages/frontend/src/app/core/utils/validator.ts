import { UntypedFormGroup, ValidationErrors } from "@angular/forms";
import * as Joi from "joi";
import { ValidationOptions } from "joi";

class joiValidator {
  private options: ValidationOptions = { abortEarly: false };
  constructor() {
    console.log("validator trigger");
  }
  public formGroup = (
    params: { schemaGenerator: any; errorLocation: string },
    options: ValidationOptions = this.options
  ) => {
    const { schemaGenerator, errorLocation } = params;
    const validator = (group: UntypedFormGroup) => {
      // Remove error from controls
      for (const key in group.controls) {
        const control = group.get(key);
        if (control?.errors) {
          control.setErrors(null);
        }
      }

      // Generate joi schema with current user input value and error happened location
      const schema = schemaGenerator(
        errorLocation,
        group.value
      ) as Joi.ObjectSchema;

      // Validate joi schema
      const result = schema.validate(group.value, options);

      if (result.error) {
        // Generate validation error
        const errors = result.error.details.reduce((error, current) => {
          // Get the error key
          const key = current.path.join(".");

          // Get the error message
          error[key] = current.message;

          return error;
        }, {} as ValidationErrors);

        // Set error value on each control
        for (const key in errors) {
          const control = group.get(key);
          if (control) {
            control.setErrors({ [key]: errors[key] });
          }
        }
        return errors;
      } else {
        return null;
      }
    };

    return validator;
  };

  public parameter = (
    params: { data: any; schemaGenerator: any; errorLocation?: string },
    options: ValidationOptions = this.options
  ) => {
    const { data, schemaGenerator, errorLocation } = params;
    const schema = schemaGenerator(errorLocation, params) as Joi.ObjectSchema;
    const { error } = schema.validate(data, options);

    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(", ");
      throw new Error(message);
    }
  };
}

export default new joiValidator();
