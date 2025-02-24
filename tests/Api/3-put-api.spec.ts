import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseURL = 'https://reqres.in/api'

    test("PUT request - Update User", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: "new name",
                job: "new job"
            },
        })
        
        const responseBody = JSON.parse(await response.text())
        
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("new name")
        expect(responseBody.job).toBe("new job")
        expect(responseBody.updatedAt).toBeTruthy()
    })

})