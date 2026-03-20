import { test as base, request, APIRequestContext, BrowserContext  } from '@playwright/test';

type ApiFixtures = {
  ApiContext: APIRequestContext;
  browserContext: BrowserContext;
  
};

export const test = base.extend<ApiFixtures>({

  ApiContext: async ({ }, use) => {
    const baseURL = process.env.API_URL!;
    const headerName = process.env.API_HEADER!;
    const apiKey = process.env.API_KEY!;

    // validate that the required environment variables are set
    if (!baseURL) throw new Error('missing  API_URL .env');
    if (!headerName ) throw new Error('missing API_HEADER .env');
    if (!apiKey) throw new Error('missing  API_KEY .env');
    
    // create a new APIRequestContext with the base URL and the API key in the headers
    const api = await request.newContext({
        baseURL: baseURL!,
        extraHTTPHeaders: {    
        [headerName!]: apiKey!,
      },
    });
    await use(api);
    await api.dispose();
  },

  browserContext: async ({ browser }, use) => {
    const baseURL = process.env.API_URL!;
    const headerName = process.env.API_HEADER!;
    const apiKey = process.env.API_KEY!;

      // validate that the required environment variables are set
    if (!baseURL) throw new Error('missing  API_URL .env');
    if (!headerName ) throw new Error('missing API_HEADER .env');
    if (!apiKey) throw new Error('missing  API_KEY .env');
    
   // create a new BrowserContext with the base URL and the API key in the headers
    const context = await browser.newContext({
      baseURL: baseURL!,
      extraHTTPHeaders: {    
        [headerName!]: apiKey!,
      },
    });

    await use(context);
    await context.close();
  },

   page: async ({ browserContext }, use) => {
    const page = await browserContext.newPage();
    await use(page);
  },



});

export { expect } from '@playwright/test';