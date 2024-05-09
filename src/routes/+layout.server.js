/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { getImageURL } from '$lib/utils.ts'

export const load = async ({ locals }) => {
    console.log("Hello world")
    const getPath = async () => {
        if (locals.user) {
            return `/${locals.user.username}`
        } else {
            return '/'
        }
    }

    const getUser = async () => {
        return locals.user ?? undefined;
    }

    const getDotUser = async () => {
        if (locals.user) {
            const dotUser = await locals.pb.collection('5_dot_users').getFirstListItem(`astralta_user="${locals.user.id}"`, {
                expand: 'projects,blocks,astralta_user',
            });

            locals.dotUser = dotUser

            // console.log(locals.user)

            locals.dotUser.cover_url = locals.user?.cover_picture ? getImageURL(locals.user.collectionId, locals.user.id, locals.user.cover_picture) : undefined
            locals.dotUser.profile_picture_url = locals.user?.profile_picture ? getImageURL(locals.user.collectionId, locals.user.id, locals.user.profile_picture) : undefined

        }
        // console.log(locals.dotUser)
       return locals.user ?? undefined
    }

    return {
        userPath: await getPath(),
        user: await getUser(),
        dotUser: await getDotUser(),
    }
}