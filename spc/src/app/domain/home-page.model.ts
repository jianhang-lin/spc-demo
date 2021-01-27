export interface HomePageModel {
  isSpcHomePage: boolean;
  isMonitorGroupHomePage: boolean;
  isMonitorHomePage: boolean;
  isChartHomePage: boolean;
}

export class HomePageModelBuilder {

  constructor() {
  }

  homePageModel(
    isSpcHomePage: boolean,
    isMonitorGroupHomePage: boolean,
    isMonitorHomePage: boolean,
    isChartHomePage: boolean
  ): HomePageModel {
    return {
      isSpcHomePage,
      isMonitorGroupHomePage,
      isMonitorHomePage,
      isChartHomePage
    };
  }

  public getSpcHomePageModel(): HomePageModel {
    return this.homePageModel(true, false, false, false);
  }

  public getMonitorGroupHomePageModel(): HomePageModel {
    return this.homePageModel(false, true, false, false);
  }

  public getMonitorHomePageModel(): HomePageModel {
    return this.homePageModel(false, false, true, false);
  }

  public getChartHomePageModel(): HomePageModel {
    return this.homePageModel(false, false, false, true);
  }
}
