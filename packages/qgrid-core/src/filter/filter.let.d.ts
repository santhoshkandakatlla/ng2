import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export class FilterLet {
  readonly filter: Command<any>;

  constructor(plugin: GridPlugin);

  has(column: ColumnModel): boolean;
  value<T>(column: ColumnModel): T;
}
