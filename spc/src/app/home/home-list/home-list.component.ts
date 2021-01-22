import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { HomeCardModel } from '../../domain/home-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'spc-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  isEnterSpcCard: boolean;
  enterSpcCardIndex: number;
  homeCards$: Observable<HomeCardModel[]>;
  listAnim$: Observable<number>;
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
    console.log(index);
    const communityId = 10418;
    if (index === this.enterSpcCardIndex) {
      // this.router.navigate(['spc/home/community_id/10418/monitor_groups']);
      this.isEnterSpcCard = true;
    }
  }
}
