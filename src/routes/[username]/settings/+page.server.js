/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const load = async ({ locals }) => {
        return {
            user: locals.dotUser
        }
    };


export const actions = {
    updateUsername: async ({ request, locals }) => {

        try {
            const data = Object.fromEntries(await request.formData());
    
            const updatedUser = {
                "username": data.username,
            }
    
            locals.dotUser = await locals.pb.collection('5_dot_users').update(locals.dotUser.id, updatedUser);
            locals.user = await locals.pb.collection('users').update(locals.user.id, updatedUser);
        } catch (error) {
            console.log("Error: ", error)
        }
        
    },

    updateFullName: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());
    
            const updatedUser = {
                "full_name": data.full_name,
            }
    
            locals.dotUser = await locals.pb.collection('5_dot_users').update(locals.dotUser.id, updatedUser);
            locals.user = await locals.pb.collection('users').update(locals.user.id, updatedUser);
        } catch (error) {
            console.log("Error: ", error)
        }
    },

    updatePrios: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());
    
            const updatedUser = {
                "priorities": data.priorities,
            }
    
            locals.dotUser = await locals.pb.collection('5_dot_users').update(locals.dotUser.id, updatedUser);
        } catch (error) {
            console.log("Error: ", error)
        }
    },

    updateInfo: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());
    
            const updatedUser = {
                "info": data.info,
            }
    
            locals.dotUser = await locals.pb.collection('5_dot_users').update(locals.dotUser.id, updatedUser);
        } catch (error) {
            console.log("Error: ", error)
        }
    },

}