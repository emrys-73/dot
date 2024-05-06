<script>
// @ts-nocheck

    import Button from "$lib/components/ui/button/button.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import * as Dialog from "$lib/components/ui/dialog";
    import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import { useChat } from "ai/svelte"

    let loaded = false;

    export let data;

    
    onMount( async () => {
        loaded = true;
    })

    const toggleCheck = async (taskName) => {
        console.log("Clicked", taskName)
        await fetch('?/toggleCheck', {
            method: 'POST',
            body: JSON.stringify({
                
            })
        })
    }

    function handleSubmit(event, input) {
        if (event.key === 'Enter') {
        event.preventDefault();  // Prevent default form submission on pressing 'Enter'
        if (input.value.trim() !== '') {  // Check if the input is not just empty spaces
            input.form.submit();  // Submit the form
        }
        }
    }

    let newProjectName;
    $: newProjectName = `${data?.user?.username}'s List`;

    let showChecked;
    $: showChecked = false;

    let showAI;
    $: showAI = false;

</script>

<div class="w-full h-full md:h-screen flex flex-col md:flex-row justify-center items-center relative">
    <!-- Control bar -->
    <div class="w-full h-1/5 md:h-1/6 z-0 bg-gradient-to-b from-transparent to-[#00000011] md:to-[#00000012] fixed bottom-0 ">

    </div>
    <!-- <div class="md:w-[60vw] w-3/4 px-8 fixed bottom-4 backdrop-blur-md  bg-[#515151] dark:bg-black bg-opacity-10 border-[1px] border-white border-opacity-40  z-50 h-10 rounded-full flex">
        <span class="font-light text-white flex">
            Ask anything
        </span>
    </div> -->
    <form class="{!showAI ? 'hidden' : 'flex'}  md:w-[60vw] w-3/4 px-1 fixed bottom-4 backdrop-blur-md  bg-[#FFFFFF] z-50 altashadow-sm dark:bg-black bg-opacity-100 border-[1px] border-white border-opacity-40 h-10 rounded-full justify-between items-center flex-row altashadow-input ">
        <input type="text" class="outline-none w-full flex rounded-full mx-1 px-3 placeholder:font-normal " placeholder="Ask anything">
        <!-- <Button class="rounded-full" variant="outline"> -->
        <Button class="rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>              
        </Button>
    </form>
    <!-- sidebar -->
    <div class=" {loaded ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-[-800px]'} w-full md:w-[60vw] lg:w-[45vw] xl:w-[38vw] flex flex-col justify-center md:justify-start items-center bg-[#F3F3F3] dark:bg-[#1a1a1a] h-full md:h-screen py-8 drop-shadow-lg z-20 border-r-2 border-[#E5E5E5] dark:border-[#101010] transition-all duration-700 ease-in-out px-6 pt-16">
        <div class="w-full flex flex-col justify-start items-center gap-2 py-2">
            <div class="w-full justify-start items-center px-4">
                <h2 class="text-3xl font-semibold">
                    All Tasks
                </h2>
            </div>
            
            <div class="rounded-xl bg-white drop-shadow-lg dark:bg-[#121212] w-full h-full flex flex-col p-6 max-h-[70vh] overflow-auto min-h-40">
                <div class="w-full justify-center items-start flex flex-col gap-2">
                    {#each data?.tasks as task}
                    <form method="POST" action="?/toggleCheck" use:enhance>
                        <div class="flex flex-row w-full gap-2 justify-start items-center">
                            <div>
                                <input type="text" bind:value={task.id} name="id" hidden>
                                <input type="text" bind:value={task.title} name="title" hidden>
                                <input type="checkbox" bind:value={task.checked} checked name="checked" hidden>
                                <Checkbox bind:checked={task.checked} type="submit"/>
                            </div>
                            <div>
                                {#if task.checked}
                                    <span class="line-through">
                                        {task.title}
                                    </span>
                                {:else}
                                    <span class="">
                                        {task.title}
                                    </span>
                                {/if}
                            </div>

                        </div>
                    </form>
                    {/each}
                </div>
            </div>
        </div>

    </div>

    <div class=" {loaded ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-[800px]'} transition-all duration-700 ease-in-out w-full h-full md:h-screen overflow-auto py-8 justify-center items-center bg-white dark:bg-[#0c0c0c] md:pt-16 flex flex-col gap-6 px-8 pb-24">        
        <div class="w-full flex flex-row justify-start items-start gap-4">
            <Dialog.Root class="">
                <Dialog.Trigger>
                    <Button class="" variant="outline">
                        + List
                    </Button>
                </Dialog.Trigger>
                <Dialog.Content class="py-8">
                  <Dialog.Header>
                    <Dialog.Title>New List</Dialog.Title>
                    <!-- <Dialog.Description>
                      Lorem ipsum
                    </Dialog.Description> -->

                  </Dialog.Header>

                  <form action="?/createList" method="POST" use:enhance class="flex flex-col gap-2 w-full h-full">
                    <div class="w-full h-full flex flex-row justify-center items-center gap-2 py-4">
                        <label for="list_name" class="opacity-40 text-md ">Title</label>
                        <input type="text" name="list_name" class="outline-none bg-transparent w-full dark:border-white border-black border-[1px] border-opacity-10 rounded-md px-2 dark:border-opacity-20 dark:placeholder:text-white dark:placeholder:text-opacity-40 placeholder:text-black placeholder:text-opacity-40" placeholder={newProjectName}>
                    </div>
                    <Button type="submit" class="w-full">
                        Create List
                    </Button>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
              <Button class="hidden" variant="outline">
                Show Checked
            </Button>
        </div>
        <div class="w-full h-full">
            {#each data?.projects as project}
                <div class="bg-white dark:bg-[#121212] drop-shadow-lg rounded-lg px-6 py-4 flex flex-col w-full">
                    <div>
                        <h3 class="font-semibold text-2xl py-2">
                            {project.title}
                        </h3>
                    </div>
                    <div class="w-full h-full flex flex-row gap-4">
                        <!-- <div class="max-w-3/5 min-w-2/5 h-full flex flex-col gap-2 py-2 justify-center items-start"> -->
                        <div class="w-full h-full flex flex-col gap-2 py-2 justify-center items-start">
                            {#each data?.tasks as task}
                                {#if task.project == project.id}
                                <form method="POST" action="?/toggleCheck" use:enhance class="w-full flex">
                                    <div class="flex flex-row w-full gap-2 justify-start items-center">
                                        <div>
                                            <input type="text" bind:value={task.id} name="id" hidden>
                                            <input type="text" bind:value={task.title} name="title" hidden>
                                            <input type="checkbox" bind:value={task.checked} checked name="checked" hidden>
                                            <Checkbox bind:checked={task.checked} type="submit"/>
                                        </div>
                                        <div>
                                            {#if task.checked}
                                                <span class="line-through">
                                                    {task.title}
                                                </span>
                                            {:else}
                                                <span class="">
                                                    {task.title}
                                                </span>
                                            {/if}
                                        </div>
            
                                    </div>
                                </form>
                                {/if}
                            {/each}
                            <form action="?/addTask" method="POST" class="w-full h-full justify-start items-center flex" use:enhance>
                                <!-- Add reactivity to animate when writting -->
                                <button type="submit" class="peer box-content opacity-40 h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                      </svg>
                                </button>
                                <input type="text" name="created_by" value={project.created_by} hidden>
                                <input type="text" name="project" value={project.id} hidden>
                                <input type="text" name="title" placeholder="New Task" class=" placeholder: px-2 placeholder:opacity-60 text-black dark:text-white outline-none w-full">
                                
                            </form>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>