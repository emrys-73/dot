/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getImageURL, serializeNonPOJOs } from '$lib/utils.ts';

export const load = async ({ locals, params }) => {
    
    const getUser = async () => {
        const createFirstProject = async (user) => {
            try {

                const firstProject = {
                    "title": "To-Do",
                    "accent_color": "#FFFFFF",
                    "created_by": user.id,
                    "team": [
                        user.id
                    ],
                    "active": true,
                    "start_date": undefined,
                    "end_date": undefined,
                    "tasks": [
                        
                    ]
                };
    
                const firstProjectRecord = await locals.pb.collection('5_dot_projects').create(firstProject);

                try {
                    const DotUserUpdatedData = {
                        "projects": [
                            firstProjectRecord.id
                        ],
                    };
                    
                    await locals.pb.collection('5_dot_users').update(user.id, DotUserUpdatedData);
                    
                } catch (error) {
                    console.log("Error adding first project: ", error)
                }
                
            } catch (error) {
                console.log("Error creating first project: ", error)
            }
        }


        try {
            locals.dotUser = await locals.pb.collection('5_dot_users').getFirstListItem(`username="${params.username}"`, {
                expand: 'projects',
            }
            );

            // console.log("Retreived dot user")
            if (locals.dotUser.projects.length == 0) {
                console.log("Creating first project")
                createFirstProject(locals.dotUser)
            }

            return locals.dotUser;
        } catch (error) {
            console.log("Error retrieving Dot user")
        }
    };

    const getProjects = async () => {
        try {
            const projects = await locals.pb.collection('5_dot_projects').getFullList({
                filter: `created_by="${locals.dotUser.id}"`,
                expand: 'tasks',
            });

            // console.log("Retreived projects")
            // console.log(projects)

            return projects;
        } catch (error) {
            console.log("Error retrieving projects")
        }
    };

    const getTasks = async () => {
        try {
            const tasks = await locals.pb.collection('5_dot_tasks').getFullList({
                filter: `created_by="${locals.dotUser.id}"`,
                expand: 'project',
                sort: 'checked, created',
            });

            // console.log("Retreived tasks")
            locals.tasks = tasks
            // console.log(tasks)

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
            console.log("Creating new task")
            console.log("Data: ", data)

            const newTask = {
                "title": data.title,
                "description": undefined,
                "checked": false,
                "created_by": locals.dotUser.id,
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
    clearChecked: async ({ request, locals }) => {
        try {
            console.log("Clearing checked tasks")

            const allCheckedTasks = await locals.pb.collection('5_dot_tasks').getFullList({
                filter: `created_by="${locals.dotUser.id}" && checked=true`,
                sort: 'created',
            });

            console.log("Checked tasks: ", allCheckedTasks)

            try {
                allCheckedTasks.forEach(async (task) => {
                    await locals.pb.collection('5_dot_tasks').delete(`${task.id}`);    
                });
            } catch (error) {
                console.log("Error deleting individual tasks: ", error)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }
}
