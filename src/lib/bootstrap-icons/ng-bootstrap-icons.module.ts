import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { BoostrapIcons } from './ng-bootstrap-icons.component';
import { Icons } from './icons.provider';


@NgModule({
  declarations: [
    BoostrapIcons
  ],
  exports: [
    BoostrapIcons
  ]
})
export class BoostrapIconsModule {
  constructor(
    @Optional() private icons: Icons
  ) {
    if ( !this.icons ) {
      throw new Error(
        `No icon provided. Make sure to use 'BoostrapIconsModule.pick({ ... })' when importing the module\n` +
        `Refer to documentation on https://github.com/biutas/ng-bootstrap-icons/issues`
      );
    }
  }

  static pick(icons: {[key: string]: string}): ModuleWithProviders {
    return {
      ngModule: BoostrapIconsModule,
      providers: [
        { provide: Icons, multi: true, useValue: icons }
      ]
    };
  }
}
