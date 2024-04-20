import {TemplateRef} from "@angular/core";

export interface TableColumn<T> {
  label: string;
  property: (keyof T);
}

export interface CustomCells {
  [key: string | number | symbol]: TemplateRef<any>;
}
