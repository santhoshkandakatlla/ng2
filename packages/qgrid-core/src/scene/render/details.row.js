import { columnFactory } from '../../column/column.factory';
import { sumBy } from '../../utility/kit';

export class DetailsRow {
  constructor(model, dataRow) {
    const createColumn = columnFactory(model);
    const emptyColumn = createColumn('pad', { key: 'row-details-pad' });

    this.columns = dataRow.getColumns;
    this.rowspan = dataRow.rowspan;

    this.colspan = (rowDetails, column) => sumBy(dataRow.columnList(column.model.pin), c => c.colspan);

    this.columns = (rowDetails, pin) => {
      if (rowDetails.column.model.pin === pin) {
        return [rowDetails.column];
      }

      return [emptyColumn];
    };

    this.getValue = () => null;
    this.getLabel = () => null;
    this.setValue = () => null;
    this.setLabel = () => null;
  }
}
