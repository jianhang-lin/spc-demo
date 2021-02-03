export interface HomePage {
  spcHomePage: boolean;
  monitorGroupHomePage: boolean;
  functionHomePage: boolean;
  monitorHomePage: boolean;
  chartHomePage: boolean;
  emailHomePage: boolean;
  lockHomePage: boolean;
  locationFamilyHomePage: boolean;
  systemLogHomePage: boolean;
  systemParameterHomePage: boolean;
}

export class HomePageBuilder {

  constructor() {
  }

  private static homePage(
    spcHomePage: boolean,
    monitorGroupHomePage: boolean,
    functionHomePage: boolean,
    monitorHomePage: boolean,
    chartHomePage: boolean,
    emailHomePage: boolean,
    lockHomePage: boolean,
    locationFamilyHomePage: boolean,
    systemLogHomePage: boolean,
    systemParameterHomePage: boolean,
  ): HomePage {
    return {
      spcHomePage,
      monitorGroupHomePage,
      functionHomePage,
      monitorHomePage,
      chartHomePage,
      emailHomePage,
      lockHomePage,
      locationFamilyHomePage,
      systemLogHomePage,
      systemParameterHomePage,
    };
  }

  public getDefaultHomePage(): HomePage {
    return HomePageBuilder.homePage(true, false,
      false, false,
      false, false,
      false, false,
      false, false);
  }

  public getSpcHomePage(): HomePage {
    return HomePageBuilder.homePage(true, false,
      false, false,
      false, false,
      false, false,
      false, false);
  }

  public getMonitorGroupHomePage(): HomePage {
    return HomePageBuilder.homePage(false, true,
      false, false,
      false, false,
      false, false,
      false, false);
  }

  public getFunctionHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      true, false,
      false, false,
      false, false,
      false, false);
  }

  public getMonitorHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, true,
      false, false,
      false, false,
      false, false);
  }

  public getChartHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      true, false,
      false, false,
      false, false);
  }

  public getEmailHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      false, true,
      false, false,
      false, false);
  }

  public getLockHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      false, false,
      true, false,
      false, false);
  }

  public getLocationFamilyHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      false, false,
      false, true,
      false, false);
  }

  public getSystemLogHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      false, false,
      false, false,
      true, false);
  }

  public getSystemParameterHomePage(): HomePage {
    return HomePageBuilder.homePage(false, false,
      false, false,
      false, false,
      false, false,
      false, true);
  }
}
