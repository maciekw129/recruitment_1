import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  input,
  QueryList,
  signal
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
export class TableComponent<T> implements AfterViewInit {
  public dataSource = input<T[]>([]);
  public columns = input<TableColumn<T>[]>([]);

  public customCells = signal<CustomCells>({});

  @ContentChildren(TableColumnCellDirective) cellsQueryList!: QueryList<TableColumnCellDirective>;

  ngAfterViewInit() {
    this.customCells.update(() => this.generateCustomCellsFromCellsQueryList(this.cellsQueryList));
  }

  private generateCustomCellsFromCellsQueryList(cellsQueryList: QueryList<TableColumnCellDirective>): CustomCells {
    return this.cellsQueryList.reduce((previous, current) => {
      return ({...previous, [current.column]: current.templateRef})
    }, {});
  }
}
