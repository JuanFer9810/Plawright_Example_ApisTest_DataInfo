import { _baseTest, expect } from '@playwright/test';
import {test as apitest} from '../pom/Data/Api-fixture';


apitest.describe('Simulation test Api GraghQL', () => {

    apitest('Consultar lista de países en GraphQL', async ({ request }) => {
        const query = `
         query GetCountries {
            countries {
            name
            code
                    }
                    }
        `;
    // Realizar la solicitud POST al endpoint GraphQL con la consulta
    // SIEMPRE DEBE SER POST
    const response = await request.post('https://countries.trevorblades.com/', {
    data: { query }
    });
   // Validar que la respuesta sea exitosa (rango 200-299)
    expect(response.ok()).toBeTruthy(); 
  
    const body = await response.json(); 
    console.log(body);
    expect(body.data.countries).not.toBeNull();
});

    apitest('Consultar Nested Queriesen GraphQL', async ({ request }) => {
        const query = `
      query GetContinents{
    continents{
      code 
      countries {
        capital
        currency
      }
      name
    }
  
}
        `;
    // Realizar la solicitud POST al endpoint GraphQL con la consulta
    // SIEMPRE DEBE SER POST
    const response = await request.post('https://countries.trevorblades.com/', {
    data: { query }
    });
   // Validar que la respuesta sea exitosa (rango 200-299)
    expect(response.ok()).toBeTruthy(); 
  
    const body = await response.json(); 
    console.log(body);
    expect(body.data.countries).not.toBeNull();
});

    apitest('Consultar clausula where GraphQL', async ({ request }) => {
        const query = `
      query GetCountriesByContinent{
    continents(where: {code: "EU"}){ 
      code 
      countries {
        capital
        currency
      }
      name
    }
  
}
        `;
    // Realizar la solicitud POST al endpoint GraphQL con la consulta
    // SIEMPRE DEBE SER POST
    const response = await request.post('https://countries.trevorblades.com/', {
    data: { query }
    });
   // Validar que la respuesta sea exitosa (rango 200-299)
    expect(response.ok()).toBeTruthy(); 
  
    const body = await response.json(); 
    console.log(body);
    expect(body.data.countries).not.toBeNull();
});



});