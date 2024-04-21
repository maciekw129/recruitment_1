import {TemplateRef} from "@angular/core";

export interface TableColumn<T> {
  label: string;
  property: (keyof T);
}

export interface RowActions<T> {
  label: string,
  action: (row: T) => any,
}

export interface CustomCells {
  [key: string | number | symbol]: TemplateRef<any>;
}
