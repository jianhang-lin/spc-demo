export interface HomePage {
  isSpcHomePage: boolean;
  isMonitorGroupHomePage: boolean;
  isFunctionHomePage: boolean;
  isMonitorHomePage: boolean;
  isChartHomePage: boolean;
}

export class HomePageBuilder {

  constructor() {
  }

  private static homePage(
    isSpcHomePage: boolean,
    isMonitorGroupHomePage: boolean,
    isFunctionHomePage: boolean,
    isMonitorHomePage: boolean,
    isChartHomePage: boolean
  ): HomePage {
    return {
      isSpcHomePage,
      isMonitorGroupHomePage,
      isFunctionHomePage,
      isMonitorHomePage,
      isChartHomePage
    };
  }

  public getDefaultHomePage(): HomePage {
    return HomePageBuilder.homePage(true, false, false, false, false);
  }

  public getSpcHomePage(): HomePage {
    return HomePageBuilder.homePage(true, false, false, false, false);
  }

  public getMonitorGroupHomePage(): HomePage {
    return HomePageBuilder.homePage(false, true, false, false, false);
  }

  public getFunctionHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false, true, false, false);
  }

  public getMonitorHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false, false, true, false);
  }

  public getChartHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false, false, false, true);
  }
}
