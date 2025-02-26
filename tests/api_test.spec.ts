import {test, expect} from '@playwright/test';
import { request } from 'http';
import { parse } from 'path';

test('API GET test', async ({request}) => {

    const response = await request.get('https://reqres.in/api/users/2')

    expect(response.status()).toBe(200)

    const text = await response.text()
    expect(text).toContain('Janet')
    
    console.log(await response.json());

})

test('API POST test', async ({request}) => {

    const response = await request.post('https://reqres.in/api/users',{
        data: {
            "name": "morpheus",
            "job": "leader"
        }
    })

    expect(response.status()).toBe(201)

    const text = await response.text()
    expect(text).toContain('morpheus')
    
    console.log(await response.json());

})

test('API POST login test', async ({request}) => {

    const response = await request.post('https://reqres.in/api/login',{
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    })

    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body.token).toBeTruthy()
    
    console.log(await response.json());

})

test('API PUT test', async ({request}) => {

    const response = await request.put('https://reqres.in/api/users/2',{
        data: {
            "name": "morpheus",
            "job": "zion resident"
        }
    })

    expect(response.status()).toBe(200)

    const text = await response.text()
    expect(text).toContain('zion resident')
    
    console.log(await response.json());

})

test('API DELETE test', async ({request}) => {

    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)

})

test('Intercept API POST', async ({page, request}) => {

    const response = await request.post('https://reqres.in/api/users',{
        data: {
            "name": "vasil",
            "job": "leader"
        }
    })
    const json = await response.json();

    await page.route('https://reqres.in/api/users', async route => {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id:101,
            name: 'Intercepted user',
            job: 'QA nqkuv',
            createdAt: new Date().toISOString()
          })
        });
      });

    console.log(json)
    const modifiedResponse = await page.evaluate(async () => {
        const res = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({name : 'Vasil madinka', job: 'Developer'})
        });
        return res.json()
    })

    console.log('Modified Response: '  + modifiedResponse)
    expect(modifiedResponse.name).toBe('Intercepted user');

})
