import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePostPageRoutingModule } from './single-post-routing.module';

import { SinglePostPage } from './single-post.page';
import { SharedComponentModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePostPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [SinglePostPage]
})
export class SinglePostPageModule {}
