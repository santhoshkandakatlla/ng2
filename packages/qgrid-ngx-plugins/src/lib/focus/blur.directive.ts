import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { noop } from '@qgrid/core';

@Directive({
  selector: '[q-grid-on-blur]',
})
export class BlurDirective implements OnInit {
  @Input('q-grid-on-blur') onBlur = noop;
  @Input('q-grid-on-blur-selector') selector = 'input';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    const element = this.renderer.selectRootElement(this.selector);
    this.renderer.listen(element, 'blur', this.onBlur);
  }
}
