import HttpService from "./HttpService";

export interface SideDrawerConfig {
  accessToken?: string;
  locale?: string;
  baseUrl?: string;
}

// Todo: use environments
const API_URL = "https://api.sidedrawer.com";

const CONFIG_DEFAULTS = {
  baseUrl: API_URL,
  locale: "en-CA",
};

const privateScope = new WeakMap();

/**
 * Module base class
 */
export default abstract class Module {
  /**
   * @param config SideDrawer SDK configurations
   */
  constructor(config: SideDrawerConfig) {
    const configWithDefaults = {
      ...CONFIG_DEFAULTS,
      ...config,
    } satisfies SideDrawerConfig;

    const http = new HttpService({
      baseURL: configWithDefaults.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${configWithDefaults.accessToken}`
      },
    });

    privateScope.set(this, {
      configWithDefaults,
      http,
    });
  }

  /** SideDrawer SDK configurations */
  get config(): SideDrawerConfig {
    return privateScope.get(this).configWithDefaults;
  }

  /** HttpService instance */
  get http(): HttpService {
    return privateScope.get(this).http;
  }

  get locale(): string {
    let locale = this.config.locale;

    if (locale == null) {
      locale = CONFIG_DEFAULTS.locale;
    }

    return locale;
  }
}
