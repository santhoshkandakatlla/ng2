import { FilterRowColumn } from '../column-type/filter.row.column';
import * as columnService from '../column/column.service';
import { Command } from '../command/command';
import { GRID_PREFIX } from '../definition';
import { Log } from '../infrastructure/log';
import { calk, findLeaves, findNode, preOrderDFS } from '../node/node.service';
import { PathService } from '../path/path.service';
import { eventPath } from '../services/dom';
import { hasOwnProperty } from '../utility/kit';

export class HeadLet {
  constructor(plugin, tagName) {
    const { model, table, observeReply } = plugin;

    this.plugin = plugin;
    this.tagName = tagName;
    this.rows = [];

    const pathFinder = new PathService(table.box.bag.head);

    this.drop = new Command({
      source: 'head.view',
      canExecute: e => {
        if (e.action === 'end') {
          return true;
        }

        const cell = pathFinder.cell(eventPath(e));
        return cell && cell.column.canMove;
      },
      execute: e => {
        const sourceKey = e.dragData;
        switch (e.action) {
          case 'over': {
            const th = pathFinder.cell(eventPath(e));
            if (!e.inAreaX(th.element)) {
              return;
            }

            const targetKey = th.column.key;
            if (sourceKey !== targetKey) {
              const { columnList } = model;

              const tree = calk(columnList().index);
              const oldPos = findNode(tree, node => node.key.model.key === sourceKey);
              const newPos = findNode(tree, node => node.key.model.key === targetKey);

              if (oldPos && newPos && newPos.path.indexOf(oldPos.node) < 0) {
                const queue = oldPos.path.reverse();
                const hostIndex = queue.findIndex(node => node.children.length > 1);
                if (hostIndex >= 0) {
                  const host = queue[hostIndex];
                  const target = queue[hostIndex - 1] || oldPos.node;
                  const index = host.children.indexOf(target);

                  host.children.splice(index, 1);
                  newPos.parent.children.splice(newPos.index, 0, target);

                  target.level = newPos.parent.level + 1;

                  preOrderDFS(
                    target.children,
                    (node, root, parent) => {
                      node.level = (root || parent).level + 1;
                    },
                    target,
                  );

                  columnList({ index: tree }, { source: 'head.view' });
                }
              }
            }
            break;
          }
          case 'end':
          case 'drop': {
            const { index } = model.columnList();
            const oldPos = findNode(index, node => node.key.model.key === sourceKey);
            if (oldPos) {
              for (const leaf of findLeaves(oldPos.node)) {
                const oldColumn = table.body.column(leaf.key.columnIndex);
                oldColumn.removeClass(`${GRID_PREFIX}-drag`);
              }
            }
            break;
          }
        }
      },
    });

    this.drag = new Command({
      source: 'head.view',
      canExecute: e => {
        const sourceKey = e.data;
        const { index } = model.columnList();
        const pos = findNode(index, node => node.key.model.key === sourceKey);
        return pos && pos.node.key.model.canMove;
      },
      execute: e => {
        const sourceKey = e.data;
        const { index } = model.columnList();
        const pos = findNode(index, node => node.key.model.key === sourceKey);
        if (pos) {
          for (const leaf of findLeaves(pos.node)) {
            const column = table.body.column(leaf.key.columnIndex);
            column.addClass(`${GRID_PREFIX}-drag`);
            return () => table.head.cell;
          }
        }
      },
    });

    this.resize = new Command({
      source: 'head.view',
      canExecute: e => {
        const key = e.data;
        const map = table.data.columnMap();
        return hasOwnProperty.call(map, key) && map[key].canResize !== false;
      },
    });

    observeReply(model.dataChanged)
      .subscribe(e => {
        if (e.hasChanges('columns')) {
          const line = columnService.flattenColumns(e.state.columns);
          model.columnList({ line }, { source: 'head.view' });
        }
      });

    observeReply(model.sceneChanged)
      .subscribe(e => {
        if (e.hasChanges('column')) {
          this.invalidate();
        }
      });

    observeReply(model.filterChanged)
      .subscribe(e => {
        if (e.hasChanges('unit')) {
          this.invalidate();
        }
      });
  }

  columns(row, pin) {
    return row.filter(c => c.model.pin === pin);
  }

  invalidate() {
    Log.info('view.head', 'invalidate');

    const { model, table } = this.plugin;
    this.rows = Array.from(model.scene().column.rows);

    if (this.rows.length > 1) {
      table.view.addClass(`${GRID_PREFIX}-head-span`);
    } else {
      table.view.removeClass(`${GRID_PREFIX}-head-span`);
    }

    if (model.filter().unit === 'row') {
      const filterRow = table.data.columns().map(c => new FilterRowColumn(c));
      this.rows.push(filterRow);
    }
  }
}
