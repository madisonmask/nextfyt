/**
 * Created by Vika on 08.06.2017.
 */
import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
    baseUrl: string;
}

export const AppConfig: IAppConfig = {
 //   apiEndpoint: "http://nextfyt.local/api/"
  apiEndpoint: "http://www.nextfyt.com/api/",
    baseUrl: "http://www.nextfyt.com",


    /*
    apiEndpoint: "http://144.76.28.156:1238/api/",
    baseUrl: "http://144.76.28.156:1238/",

    */


};