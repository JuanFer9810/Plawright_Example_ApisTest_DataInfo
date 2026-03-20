import { expect } from '@playwright/test';
import {test as apitest} from '../pom/Data/Api-fixture';

apitest.describe('tests API - Football mocks error', () => {

    apitest('should return error when mocks are not correct with fulfill', async ({ page}) => {
       
        // intercept the request to /teams and return a 500 error with a 
        // custom error message
      await page.route('**/teams', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
        });

    const response = await page.goto('/teams');
        expect(response).not.toBeNull();
        expect(response!.status()).toBe(500);
    
    const responseBody = await response!.json();
        expect(responseBody).toEqual({ error: 'Internal Server Error' });
    });

    apitest('should return error when mocks modify json body', async ({ page}) => {
      await page.route('/status', async (route) => {
        await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { "get": "status",
                "parameters": [],
                "errors": [],
                "results": 0,
                "paging": { "current": 1, "total": 1 },
                "response": {
                "account": {
                    // detele the lastname property to be 
                    // different from the original response
                //"firstname": "Juanfer",
                "lastname": "Perez Upegui",
                "email": "juanfer9810@gmail.com"
                            },
                "subscription": { "plan": "Free", "end": "2027-03-19T00:00:00+00:00", "active": true },
                "requests": { "current": 10, "limit_day": 100 }
                            }        
                 },
      });
        });
        const response = await page.goto('/status');
        expect(response).not.toBeNull();
        expect(response!.status()).toBe(200);

        const status = await response!.json();
        console.log(status);

        const properties = status.response.account.firstname;
        expect(properties).toEqual(undefined);

  
    });
    
    apitest('capture and create hard archive', async ({ page}) => {
        await page.routeFromHAR('pom/hars/statusHars.har', { 
    url: '/status', 
    update: true    
  });
        await page.goto('/status');
    });

    apitest('should return error when mocks with har utilize', async ({ page}) => {
        await page.routeFromHAR('pom/hars/statusHars.har', { 
    url: '/status', 
    notFound: 'fallback'   
        });
        const response = await page.goto('/status');
        expect(response).not.toBeNull();
        const status = await response!.json();
        console.log(status);
        expect(status.response.account.firtname).toBeUndefined();
    });

});