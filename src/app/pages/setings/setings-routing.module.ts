import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetingsPage } from './setings.page';

const routes: Routes = [
  {
    path: '',
    component: SetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetingsPageRoutingModule {}
