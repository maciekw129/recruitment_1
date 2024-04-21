import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { VALIDATION_ERRORS } from "./shared/components/error/error.tokens";
import { validationErrors } from "../data/validation-errors.data";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {provide: VALIDATION_ERRORS, useValue: validationErrors}]
};
