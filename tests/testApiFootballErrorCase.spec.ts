import { expect } from '@playwright/test';
import {test as apitest} from '../pom/Data/Api-fixture';

apitest.describe('tests API - Football error case', () => {

    apitest('Validate error response for invalid endpoint', async ({ ApiContext }) => {
      const response = await ApiContext.get('/invalid-endpoint');
        // validate status code, in this case the API returns 200 but with an 
        // error message in the response body, 404 would be more appropriate for an invalid endpoint
        expect(response.status()).toBe(200);
        const errorResponse = await response.json();;
        // validate that the response is an object
        expect(errorResponse).toBeInstanceOf(Object);
        // validate that error message contains 'Invalid-endpoint'
        expect(errorResponse.errors.endpoint).toContain('Invalid-endpoint');
    });

      apitest('Validate error response for endpoint incorrect', async ({ ApiContext }) => {
      const response = await ApiContext.get('/statuss');
        // validate status code, in this case the API returns 200 but with an 
        // error message in the response body
        expect(response.status()).toBe(200);
        const errorResponse = await response.json();;
        // validate that the response is an object
        expect(errorResponse).toBeInstanceOf(Object);
        expect(errorResponse.errors.endpoint).toContain('endpoint does not exist');
        console.log(errorResponse);
       
    });

      apitest('Validate error response for invalid http method', async ({ ApiContext }) => {
      const response = await ApiContext.put('/status');
        // validate status code
        expect(response.status()).toBe(403);
        const errorResponse = await response.json();
        expect(errorResponse).toBeInstanceOf(Object);
        // validate that error message contains 'Invalid http method'
        expect(errorResponse.errors.token).toContain('Method not supported');
    });



});