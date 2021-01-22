import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'spc-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {

  @Input() item;
  @Input() index;
  @Output() doSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.doSelected.emit();
  }
}
