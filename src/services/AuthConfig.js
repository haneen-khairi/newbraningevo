import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID ,
        authority:`https://login.microsoftonline.com/${import.meta.env.VITE_MSAL_TANANT_ID}`,
        redirectUri:"/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false, 
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);
