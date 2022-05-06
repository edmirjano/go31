import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TileComponent } from './general-info/tile/tile.component';
import { LinkListComponent } from './link-list/link-list.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { SliderComponent } from './slider/slider.component';
import { PostTitleComponent } from './post-title/post-title.component';
import { OptionsPopoverComponent } from './options-popover/options-popover.component';

@NgModule({
    declarations: [
        GeneralInfoComponent,
        TileComponent,
        LinkListComponent,
        ParagraphComponent,
        SliderComponent,
        PostTitleComponent,
        OptionsPopoverComponent
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
        SliderComponent,
        PostTitleComponent,
        OptionsPopoverComponent
    ],
})
export class SharedComponentModule { }