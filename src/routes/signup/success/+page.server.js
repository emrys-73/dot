/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.ts'

export const actions = {
    verified: async ({ locals, request }) => {
        
        try {
            // This gives us an object with all of the fields mapped
            console.log("Some coding to do here")
        } catch (err) {
            console.log('Error: ', err)
            throw redirect(303, '/signup')
        }
        console.log("Log in success")
        throw redirect(303, `/login`)
    }
}
