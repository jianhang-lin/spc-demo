import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { HomeCardModel } from '../../domain/home-card.model';
import { HomePageBuilder } from '../../domain/home-page.model';

@Component({
  selector: 'spc-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {

  @Output() doSelected = new EventEmitter<void>();
  enterSpcCardIndex = 5;
  isEnterSpcCard: boolean;
  homeCards$: Observable<HomeCardModel[]>;
  homeCardsSubscription: Subscription;
  constructor(private router: Router,
              private homeService: HomeService) { }

  ngOnInit() {
    this.isEnterSpcCard = false;
    this.homeCards$ = this.homeService.initHomeCards();
    this.homeCardsSubscription = this.homeCards$.subscribe(homeCard => {
    });
  }

  ngOnDestroy(): void {
    if (this.homeCardsSubscription) {
      this.homeCardsSubscription.unsubscribe();
    }
  }

  selectHomeCard(index: number) {
    const communityId = 10418;
    if (index === this.enterSpcCardIndex) {
      this.homeService.switchCurrentHomePage(new HomePageBuilder().getMonitorGroupHomePage());
    }
  }
}
