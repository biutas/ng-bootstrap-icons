import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'i-git-pull-request',
  styles: [`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `],
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-git-pull-request">
    <circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>
  </svg>`
})
export class IconGitPullRequestComponent {}

@NgModule({
  declarations: [ IconGitPullRequestComponent ],
  exports: [ IconGitPullRequestComponent ]
})
export class IconGitPullRequest {}