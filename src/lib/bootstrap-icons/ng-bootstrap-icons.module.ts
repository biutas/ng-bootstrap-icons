import { NgModule, ModuleWithProviders, Optional } from "@angular/core";
import { BootstrapIcons } from "./ng-bootstrap-icons.component";
import { Icons } from "./icons.provider";

@NgModule({
  declarations: [BootstrapIcons],
  exports: [BootstrapIcons],
})
export class BootstrapIconsModule {
  constructor(@Optional() private icons: Icons) {
    if (!this.icons) {
      throw new Error(
        `No icon provided. Make sure to use 'BootstrapIconsModule.pick({ ... })' when importing the module\n` +
          `Refer to documentation on https://github.com/biutas/ng-bootstrap-icons/issues`
      );
    }
  }

  static pick(icons: {
    [key: string]: string;
  }): ModuleWithProviders<BootstrapIconsModule> {
    return {
      ngModule: BootstrapIconsModule,
      providers: [{ provide: Icons, multi: true, useValue: icons }],
    };
  }
}
