import { test as base, request, APIRequestContext, BrowserContext  } from '@playwright/test';

type ApiGraphQLFixtures = {
  ApiContext: APIRequestContext;
};

export const test = base.extend<ApiGraphQLFixtures>({

  ApiContext: async ({ }, use) => {
    const baseURL = process.env.API_GRAPHQL_URL!;
   

    // validate that the required environment variables are set
    if (!baseURL) throw new Error('missing  API_GRAPHQL_URL .env');
   
    
    // create a new APIRequestContext with the base URL and the API key in the headers
    const api = await request.newContext({
        baseURL: baseURL!,
    });

    await use(api);
    await api.dispose();
  },

});

export { expect } from '@playwright/test';