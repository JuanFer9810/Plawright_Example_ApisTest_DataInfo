import { expect } from '@playwright/test';
import {test as apitest} from '../pom/Data/Api-fixture';

apitest.describe('tests API - Football', () => {

  apitest('Validate status API response and structure', async ({ ApiContext }) => {

    const response = await ApiContext.get('/status');
    // validate status code
    await expect(response.status()).toBe(200);
    const status = await response.json();
    // validate that the response is an object
    expect(status).toBeInstanceOf(Object);
    // validate that the response has the expected properties
    expect(status).toHaveProperty('response');
    expect(status.response).toHaveProperty('account');
    expect(status.response.account).toHaveProperty('firstname');
    expect(status.response.account).toHaveProperty('lastname');
    expect(status.response.account).toHaveProperty('email');
    // validate that the firstname contains 'Juan'
    expect(status.response.account.firstname).toContain('Juan');
    console.log(Object.keys(status.response.account));
    console.log(status);
  });
  
  apitest('Validate timezone API response and structure', async ({ ApiContext }) => {
    const response = await ApiContext.get('/timezone');
    // validate status code
    expect(response.status()).toBe(200);
    const timeZone = await response.json();
    // validate that the response is an array
    expect(timeZone).toBeInstanceOf(Array);

  });



 });


