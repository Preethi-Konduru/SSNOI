import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseURL = 'https://reqres.in/api'

    test("POST request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                id: 100,
            },
        })
        
        const responseBody = JSON.parse(await response.text())
        
        expect(responseBody.id).toBe(100)
        expect(responseBody.createdAt).toBeTruthy()
    })

})