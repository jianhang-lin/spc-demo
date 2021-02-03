import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { FunctionService } from '../../services/function.service';
import { FunctionCard } from '../../domain/function-card.model';
import { HomePageBuilder } from '../../domain/home-page.model';

@Component({
  selector: 'spc-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit {

  functionCards$: Observable<FunctionCard[]>;
  constructor(
    private homeService: HomeService,
    private functionService: FunctionService
  ) { }

  ngOnInit() {
    this.functionCards$ = this.functionService.getFunctionCards();
    this.functionCards$.subscribe(functionCard => {
    });
  }

  onClickFunctionCard($event: MouseEvent, functionCard: FunctionCard) {
    // call preventDefault to stop go to target url
    $event.preventDefault();
    switch (functionCard.url) {
      case '/spc/monitors':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getMonitorHomePage());
        break;
      case '/spc/emails':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getEmailHomePage());
        break;
      case '/spc/locks':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getLockHomePage());
        break;
      case '/spc/location-families':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getLocationFamilyHomePage());
        break;
      case '/spc/system-logs':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getSystemLogHomePage());
        break;
      case '/spc/system-parameters':
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getSystemParameterHomePage());
        break;
      default:
        this.homeService.switchCurrentHomePage(new HomePageBuilder().getDefaultHomePage());
        break;
    }
  }
}
