import { Component, ElementRef, Input, Inject, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Icons } from './icons.provider';
import { uppercamelcase } from './utils';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bt-icon, bootstrap-icon, bi',
  templateUrl: './ng-bootstrap-icons.component.html',
  styleUrls: [ './ng-bootstrap-icons.component.scss' ],
})
export class BootstrapIcons implements OnChanges {
  @Input() name!: string;

  constructor(
    private elem: ElementRef,
    private changeDetector: ChangeDetectorRef,
    @Inject(Icons) private icons: Icons
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // icons are provided as an array of objects because of "multi: true"
    const icons = Object.assign({}, ...(this.icons as any as object[]));
    const svg = icons[ uppercamelcase(changes.name.currentValue) ] || '';

    if (!svg) {
      console.warn(
        `Icon not found: ${changes.name.currentValue}\n` +
        `Refer to documentation on https://github.com/biutas/ng-bootstrap-icons/issues`
      );
    }

    this.elem.nativeElement.innerHTML = svg;
    this.changeDetector.markForCheck();
  }
}
