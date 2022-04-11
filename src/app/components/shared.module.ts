import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TileComponent } from './general-info/tile/tile.component';
import { LinkListComponent } from './link-list/link-list.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
    declarations: [
        GeneralInfoComponent,
        TileComponent,
        LinkListComponent,
        ParagraphComponent,
        SliderComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        GeneralInfoComponent,
        TileComponent,
        LinkListComponent,
        ParagraphComponent,
        SliderComponent
    ],
})
export class SharedComponentModule { }