import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {CustomCells, TableColumn} from "./table.model";
import {TableColumnCellDirective} from "./table-column-cell.directive";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {
  public dataSource = input<T[]>([]);
  public columns = input<TableColumn<T>[]>([]);

  private cellsList = contentChildren<TableColumnCellDirective>(TableColumnCellDirective);

  public customCells = computed(() => this.generateCustomCellsFromCellsList(this.cellsList()))

  private generateCustomCellsFromCellsList(cellsQueryList: readonly TableColumnCellDirective[]): CustomCells {
    return cellsQueryList.reduce((previous, current) => {
      return ({...previous, [current.column]: current.templateRef})
    }, {});
  }
}
