import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { HomeCardModel } from '../../domain/home-card.model';
import { Router } from '@angular/router';
import { HomePageBuilder } from '../../domain/home-page.model';

@Component({
  selector: 'spc-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  @Output() doSelected = new EventEmitter<void>();
  isEnterSpcCard: boolean;
  enterSpcCardIndex: number;
  homeCards$: Observable<HomeCardModel[]>;
  constructor(private router: Router,
              private homeService: HomeService) { }

  ngOnInit() {
    this.isEnterSpcCard = false;
    this.enterSpcCardIndex = 5;
    this.homeCards$ = this.homeService.initHomeCards();
    this.homeCards$.subscribe(value => {
      console.log(JSON.stringify(value));
    });
  }

  selectHomeCard(index: number) {
    const communityId = 10418;
    if (index === this.enterSpcCardIndex) {
      this.homeService.switchCurrentHomePage(new HomePageBuilder().getMonitorGroupHomePage());
    }
  }
}
