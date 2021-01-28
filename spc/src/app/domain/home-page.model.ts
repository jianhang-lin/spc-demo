export interface HomePageModel {
  isSpcHomePage: boolean;
  isMonitorGroupHomePage: boolean;
  isMonitorHomePage: boolean;
  isChartHomePage: boolean;
}

export class HomePageModelBuilder {

  constructor() {
  }

  private static homePageModel(
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

  public getDefaultHomePageModel(): HomePageModel {
    return HomePageModelBuilder.homePageModel(true, false, false, false);
  }

  public getSpcHomePageModel(): HomePageModel {
    return HomePageModelBuilder.homePageModel(true, false, false, false);
  }

  public getMonitorGroupHomePageModel(): HomePageModel {
    return HomePageModelBuilder.homePageModel(false, true, false, false);
  }

  public getMonitorHomePageModel(): HomePageModel {
    return HomePageModelBuilder.homePageModel(false, false, true, false);
  }

  public getChartHomePageModel(): HomePageModel {
    return HomePageModelBuilder.homePageModel(false, false, false, true);
  }
}
