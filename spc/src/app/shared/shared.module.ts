import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedUiModule } from 'shared-ui';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedUiModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedUiModule,
    CardComponent,
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
