/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { redirect } from "@sveltejs/kit";
import { serializeNonPOJOs, getImageURL } from "$lib/utils.ts";

const addToCookies = (data4cookies) => {
    console.log("Added to cookies")
    return true;
}

let userPath = '/'

export const load = async ({ locals, params }) => {
    if (locals.user) {
        throw redirect(303, locals.user?.username)
    }
}

export const actions = {
    login: async ({ request, locals }) => {
        const createDotUser = async (astralta_user) => {
            const new_user = {
                "full_name": astralta_user.full_name,
                "username": astralta_user.username,
                "profile_picture_url": astralta_user.profile_picture_url,
                "cover_picture_url": astralta_user.cover_url,
                "info": astralta_user.info,
                "priorities": undefined,
                "blocks": [

                ],
                "astralta_user": astralta_user.id
            };
            
            await locals.pb.collection('5_dot_users').create(new_user);
        }

        const body = await Object.fromEntries(await request.formData())

        try {
            let user = await serializeNonPOJOs(await locals.pb.collection('users').authWithPassword(body.email, body.password)).record

            // Skipping the verification test for now

            user.cover_url = user?.cover_picture ? getImageURL(user.collectionId, user.id, user.cover_picture) : undefined
            user.profile_picture_url = user?.profile_picture ? getImageURL(user.collectionId, user.id, user.profile_picture) : undefined

            try {
                const dot_user = await serializeNonPOJOs(await locals.pb.collection('5_dot_users').getFirstListItem(`astralta_user="${user.id}"`))
                
                userPath = `/${dot_user.username}/`

            } catch (error) {
                createDotUser(user);
                const dot_user = await serializeNonPOJOs(await locals.pb.collection('5_dot_users').getFirstListItem(`astralta_user="${user.id}"`))

                userPath = `/${dot_user.username}/`
            }
            
        } catch (error) {
            console.log('Error: ', error)
            throw redirect(303, '/whoops')
            // DO a lot of error handling here
                // wrong password
                // wrong email
                // not verified
        }

        throw redirect(303, userPath)
    }
};