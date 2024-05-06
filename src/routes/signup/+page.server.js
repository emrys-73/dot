/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.ts'

export const actions = {
    register: async ({ locals, request }) => {
        
        try {
            // This gives us an object with all of the fields mapped
        const data = Object.fromEntries(await request.formData());

        // let username = generateUsername(data.name.split(' ').join('')).toLowerCase()

        const newAstraltaUser = {
            "username": data.username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.passwordConfirm,
            "role": "user",
            "full_name": data.full_name,
            "bio": undefined,
            "info": undefined,
            "date_of_birth": undefined,
            "address": undefined,
            "phone": undefined,
            "socials": undefined,
            "followers": [
                
            ],
            "following": [
                
            ]
        };

        const newAstraltaRecord = await locals.pb.collection('users').create(newAstraltaUser);
        locals.user = newAstraltaRecord

        await locals.pb.collection('users').requestVerification(`${data.email}`);

        try {
            const newDotUser = {
                "full_name": data.full_name,
                "username": data.username,
                "projects": [
                    
                ],
                "profile_picture_url": undefined,
                "cover_picture_url": undefined,
                "info": undefined,
                "priorities": undefined,
                "blocks": [
                    
                ],
                "astralta_user": newAstraltaRecord.id
            };
    
                locals.dotUser = await locals.pb.collection('5_dot_users').create(newDotUser);
                locals.dotUser.password = data.password    
            
        } catch (error) {
            console.log('Error creating Dot user: ', error)
        }

        } catch (err) {
            console.log('Error creating Astralta user: ', err)
        }
        console.log("Log in success")
        throw redirect(303, `/signup/success`)
    }
}