import { Pipe, PipeTransform } from '@angular/core';
import {Position} from "../employees.model";
import {POSITION_LABELS} from "../employees.data";

@Pipe({
  name: 'positionLabel',
  standalone: true
})
export class PositionLabelPipe implements PipeTransform {

  transform(value: Position): string {
    return POSITION_LABELS[value];
  }
}
