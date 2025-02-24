import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseURL = 'https://reqres.in/api'

    test("Simple API Test- Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        expect (response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("Simple API Test- Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/non-existing-endpoint`)
        expect (response.status()).toBe(404)
    })

    test("Simple API Test- Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

})