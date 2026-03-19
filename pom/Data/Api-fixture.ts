import { test as base, request, APIRequestContext  } from '@playwright/test';

type ApiFixtures = {
  ApiContext: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  ApiContext: async ({ }, use) => {
    const baseURL = process.env.API_URL!;
    const headerName = process.env.API_HEADER!;
    const apiKey = process.env.API_KEY!;

    if (!baseURL) throw new Error('missing  API_URL .env');
    if (!headerName ) throw new Error('missing API_HEADER .env');
    if (!apiKey) throw new Error('missing  API_KEY .env');
    
    
    const api = await request.newContext({
        baseURL: baseURL!,
        extraHTTPHeaders: {    
        [headerName!]: apiKey!,
      },
    });
    await use(api);
    await api.dispose();
  },
});

export { expect } from '@playwright/test';