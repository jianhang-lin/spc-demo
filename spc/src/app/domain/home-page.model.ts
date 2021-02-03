export interface HomePage {
  spcHomePage: boolean;
  monitorGroupHomePage: boolean;
  functionHomePage: boolean;
  monitorHomePage: boolean;
  chartHomePage: boolean;
}

export class HomePageBuilder {

  constructor() {
  }

  private static homePage(
    spcHomePage: boolean,
    monitorGroupHomePage: boolean,
    functionHomePage: boolean,
    monitorHomePage: boolean,
    chartHomePage: boolean
  ): HomePage {
    return {
      spcHomePage,
      monitorGroupHomePage,
      functionHomePage,
      monitorHomePage,
      chartHomePage
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
