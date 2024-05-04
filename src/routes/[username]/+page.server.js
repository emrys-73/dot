/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getImageURL, serializeNonPOJOs } from '$lib/utils.ts';

export const load = async ({ locals, params }) => {
    const getUser = async () => {
        const createFirstProject = async (user) => {
            const firstProject = {
                "title": "To-Do",
                "accent_color": "#FFFFFF",
                "createdy_by": user.id,
                "team": [
                    user.id
                ],
                "active": true,
                "start_date": undefined,
                "end_date": undefined,
            };

            const firstProjectRecord = await locals.pb.collection('5_dot_projects').create(firstProject);

            const userData = {
                "projects": [
                    firstProjectRecord.id
                ],
            };
            
            await locals.pb.collection('5_dot_users').update(user.id, userData);
        }


        try {
            const user = await locals.pb.collection('5_dot_users').getFirstListItem(`username="${params.username}"`, {
                expand: 'projects',
            })

            // console.log(user)
            // console.log(user.projects.length)

            if (user.projects.length == 0) {
                // console.log("No Projects found, creating first project.")
                // createFirstProject(user)
            }

            locals.dotUser.profile_picture_url = locals.user.profile_picture ? getImageURL(locals.user.collectionId, locals.user.id, locals.user.profile_picture) : undefined

            return locals.dotUser;
        } catch (error) {
            console.log("Error retrieving user")
        }
    };

    const getProjects = async () => {
        try {
            const projects = await locals.pb.collection('5_dot_projects').getFullList(`created_by="${locals.dotUser.id}"`, {
                expand: 'tasks',
            });

            // console.log(projects)
            // projects.forEach(project => {
            //     project.tasks.forEach(task => {
            //         task = 
            //     });
            // });

            return projects;
        } catch (error) {
            console.log("Error retrieving projects")
        }
    };

    const getTasks = async () => {
        try {
            const tasks = await locals.pb.collection('5_dot_tasks').getFullList(`created_by="${locals.dotUser.id}"`, {
                expand: 'project',
                sort: 'checked, created',
            });

            return tasks
        } catch (error) {
            console.log("Error retrieving tasks", error)
        }
    }

    return {
        user: await getUser(),
        projects: await getProjects(),
        tasks: await getTasks(),
    }
}

export const actions = {
    toggleCheck: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());


            const updatedTaskData = {
                "checked": data.checked === 'true',
            };

            // console.log(data)
            const record = await locals.pb.collection('5_dot_tasks').update(data.id, updatedTaskData);

        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    },

    addTask: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());

            const newTask = {
                "title": data.title,
                "description": undefined,
                "checked": false,
                "created_by": data.created_by,
                "project": data.project,
                "start_date": undefined,
                "end_date": undefined,
                "urgency": "!",
                "difficulty": undefined,
                "XP": undefined,
                "recurring": false,
                "blocks": [
                    
                ],
                // Some day it'd be cool to have a automatically assingned user
                "assigned_to": [
                    
                ]
            };
            
            console.log("Created Data, ready to push to Base")
            console.log(newTask)
            await locals.pb.collection('5_dot_tasks').create(newTask);

        } catch (error) {
            console.log("Error: ", error)
        }
    },

    createList: async ({ request, locals }) => {
        try {
            const data = Object.fromEntries(await request.formData());

            const newProjectData = {
                "title": data.list_name,
                "accent_color": undefined,
                "created_by": locals.dotUser.id,
                "team": [
                    locals.dotUser.id
                ],
                "active": true,
                "start_date": undefined,
                "end_date": undefined,
                "tasks": [
                    
                ]
            };
            
            const newProject = await locals.pb.collection('5_dot_projects').create(newProjectData);

        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    },
}
