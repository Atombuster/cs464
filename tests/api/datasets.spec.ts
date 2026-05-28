import { test, expect } from '@playwright/test'

test.describe('/api/datasets', () => {
    test('returns all datasets', async ({ request }) => {
        const response = await request.get('/api/datasets')

        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty('datasets')
        expect(typeof body.datasets).toBe('object')
    })

    test('returns a specific dataset by name', async ({ request }) => {
        const response = await request.get(
            '/api/datasets?name=bh_legends'
        )

        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            items: expect.any(Array)
        })

        if (body.items.length > 0) {
            expect(body.items[0]).toMatchObject({
                name: expect.any(String),
                order: expect.any(Number)
            })
        }
    })

    test('returns 404 for missing dataset', async ({ request }) => {
        const response = await request.get(
            '/api/datasets?name=does-not-exist'
        )

        expect(response.status()).toBe(404)

        const body = await response.json()

        expect(body).toEqual({
            error: 'No dataset found for does-not-exist'
        })
    })

})
