import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('filter-row-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

export class FilterRowColumnModel extends ColumnModel {
  constructor(model) {
    super();

    Object.assign(this, model);

    this.key = `$filter.row.${model.key}`;
    this.type = 'filter-row';
    this.category = 'control';

    this.canResize = false;
    this.canSort = false;
    this.canMove = false;

    this.model = model;
  }
}

export class FilterRowColumn extends ColumnView {
  constructor(model) {
    super(new FilterRowColumnModel(model));
  }
}
