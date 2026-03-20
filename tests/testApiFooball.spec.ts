import { expect } from '@playwright/test';
import {test as apitest} from '../pom/Data/Api-fixture';

apitest.describe('tests API - Football HTTP GET', () => {

  apitest('Validate status API response,structure, properties', async ({ ApiContext }) => {

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
    // validate that the response is an object
    expect(timeZone).toBeInstanceOf(Object);
    // validate that the response has the expected properties
    expect(timeZone).toHaveProperty('response');
    // validate that the response has the expected structure
    expect(timeZone.response).toBeInstanceOf(Array);
    // save the list of timezones in a variable and print it
    const listTimezones = timeZone.response;
    //console.log(listTimezones);
  });

  apitest('Validate countries API response,structure and find country code', async ({ ApiContext }) => {
    const response = await ApiContext.get('/countries');
    // validate status code
    expect(response.status()).toBe(200);
    const countries = await response.json();
    // validate that the response is an object
    expect(countries).toBeInstanceOf(Object);
    // map the list of countries to a new array with only the name and code properties
    const codeCountries = countries.response.map((country: { name: string; code: string }) => {
      return {
        name: country.name,
        code: country.code,
      };
    });
   // find the country code for Argentina and print it
    const countryName = 'Argentina';
    const country = codeCountries.find((c: { name: string; code: string }) => c.name === countryName);
    console.log(`The code for ${countryName} is ${country.code}`);
    
  });

  apitest('Validate leagues API response,structure and map data', async ({ ApiContext }) => {
    const response = await ApiContext.get('/leagues');
    // validate status code
    expect(response.status()).toBe(200);
    const leagues = await response.json();
    // validate that the response is an object
    expect(leagues).toBeInstanceOf(Object);
    console.log(leagues);
    // map the list of leagues to a new array with only the id, name and type properties
    const leagueData = leagues.response.map((league: { league: { id: number; name: string; type: string } }) => {
      return {
        id: league.league.id,
        name: league.league.name,
        type: league.league.type,
      };
    });
    console.log(leagueData);
  });

  apitest('Validate league season API response,structure and map data', async ({ ApiContext }) => {
    const response = await ApiContext.get('/leagues/seasons');
    // validate status code
    expect(response.status()).toBe(200);
    const seasons = await response.json();
    // validate that the response is an object
    expect(seasons).toBeInstanceOf(Object);
    console.log(seasons);
    
  });

  apitest('Validate teams API response,structure and map data', async ({ ApiContext }) => {
   // make a GET request to the teams endpoint with a query parameter for league id 33
    const response = await ApiContext.get('/teams?id=33');
    // validate status code
    expect(response.status()).toBe(200);
    const teams = await response.json();
    // validate that the response is an object
    expect(teams).toBeInstanceOf(Object);
    console.log(teams);
    const teamData = teams.response.map((team: { team: { id: number; name: string; founded: number; country: string } }) => {
      return {
        id: team.team.id,
        name: team.team.name,
        founded: team.team.founded,
        country: team.team.country,
      };
    });
    console.log(teamData);
  });
  
 });



