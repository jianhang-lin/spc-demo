import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FunctionService } from '../../services/function.service';
import { FunctionCard } from '../../domain/function-card.model';

@Component({
  selector: 'spc-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit {

  functionCards$: Observable<FunctionCard[]>;
  constructor(
    private functionService: FunctionService
  ) { }

  ngOnInit() {
    this.functionCards$ = this.functionService.getFunctionCards();
    this.functionCards$.subscribe(functionCard => {
    });
  }
}
