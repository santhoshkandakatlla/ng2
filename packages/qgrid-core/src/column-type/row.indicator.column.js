import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('row-indicator-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

export class RowIndicatorColumnModel extends ColumnModel {
  constructor() {
    super('row-indicator');

    this.key = '$row.indicator';
    this.category = 'control';

    this.canEdit = false;
    this.canSort = false;
    this.canResize = false;
    this.canMove = false;
    this.canFocus = false;
    this.canHighlight = false;
    this.canFilter = false;
    this.pin = 'left';
  }
}

export class RowIndicatorColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? RowIndicatorColumn.assign(model) : new RowIndicatorColumnModel();
  }
}
