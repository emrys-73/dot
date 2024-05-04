/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.ts'

export const actions = {
    register: async ({ locals, request }) => {
        
        // This gives us an object with all of the fields mapped
        const data = Object.fromEntries(await request.formData());

        let username = generateUsername(data.name.split(' ').join('')).toLowerCase()

        const new_user = {
            "username": username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.passwordConfirm,
            "delete_requested": false,
            "tier": "free",
            "msg_count": 0,
            "run_count": 0,
            "base_data": ""
        };

        try {
            await locals.pb.collection('aivery_users').create(new_user);
            await locals.pb.collection('aivery_users').requestVerification(data.email)
            
        } catch (err) {
            console.log('Error: ', err)
            throw redirect(303, '/whoops')    
            // throw error(500, 'Something went wrong') 
        }

        // Adapt for verify site
        throw redirect(303, '/')
    }
}