import { Guard } from '../infrastructure/guard';
import { sortFactory } from '../row-list/row.list.sort';
import { Scene } from '../scene/scene';

export function viewPipe(memo, context, next) {
  Guard.notNull(memo, 'memo');

  const tag = {
    source: context.source || 'view.pipe',
    behavior: 'core',
  };

  const { model } = context;

  const scene = new Scene(model);
  let rows = scene.rows(memo);

  const { columns, nodes, pivot } = memo;
  const columnLine = scene.columnLine(columns);

  if (!model.sort().by.length) {
    const order = sortFactory(model);
    rows = order(rows);
  }

  model.view({
    rows,
    columns: columnLine.map(c => c.model),
    nodes,
    pivot,
  }, tag);

  next(memo);
}
