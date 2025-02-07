import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = ['column-email-basic', 'Cell value is email'];

@Component({
  selector: 'example-column-email-basic',
  templateUrl: 'example-column-email-basic.component.html',
  styleUrls: ['example-column-email-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnEmailBasicComponent {
  private label = 'QGRID';

  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows = [
    {
      'valid': 'qgrid.team@gmail.com',
      'invalid': 'Lorem ipsum dolor',
      'withLabel': 'qgrid.team@gmail.com',
      'null': null,
      'undefined': undefined,
      'empty': '',
      'customTemplate': 'qgrid.team@gmail.com',
    },
  ];

  myLabel: (row: any, value?: any) => string | undefined;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.myLabel = (...args) => {
      const [, value] = args;
      if (args.length > 1) {
        self.label = value;
        return;
      }

      return self.label;
    };
  }
}
