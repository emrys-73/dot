<script lang="ts">
	import Bell from "svelte-radix/Bell.svelte";
    import Check from "svelte-radix/Check.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Skeleton } from "$lib/components/ui/skeleton";
	import { onMount } from "svelte";
    import { fade, slide, scale, fly, blur } from 'svelte/transition';
    import { quintOut, cubicInOut, quintInOut } from 'svelte/easing';
    import { useTransform, useViewportScroll } from "svelte-motion";
    import { Textarea } from "$lib/components/ui/textarea";
    import { enhance } from '$app/forms';
    import { showBg } from "../../../stores";
    export let data;


    let loaded: boolean;
    $: loaded = false;

    export let timeout = 0;

    onMount( async () => {
        setTimeout(() => {
            loaded = true;
        }, timeout);
    })

    const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago"
    },
    {
      title: "You have a new message!",
      description: "1 hour ago"
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago"
    }
  ];

  let aboutme: any;
  $: aboutme = data?.user?.info


  let showPrios: boolean;
  $: showPrios = false;

</script>


<div class="w-full h-full min-h-screen justify-center items-center px-4 flex">
    {#if loaded}
    <div
        transition:fly={{ delay: 0, duration: 1000 }}
         class="w-full h-full flex justify-center items-center py-20">
        <Card.Root 
            class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 transition-all duration-700 ease-in-out h-full">
            <Card.Header>
                <Card.Title class="text-3xl">My Settings</Card.Title>
                <!-- <Card.Description class="dark:text-white opacity-40 text-black">More settings available soon.</Card.Description> -->
            </Card.Header>
            <Card.Content class="grid gap-4">
                <div class="w-full h-full flex flex-row justify-between items-center transition-all duration-700 ease-in-out">
                    
    
                    <form action="?/updateFullName" method="POST" use:enhance>
                        <label for="full_name" class="opacity-40 text-md ">Full Name</label>
                        <input type="text" name="full_name" placeholder={`${data?.user?.full_name}`} class="placeholder:text-xl bg-transparent w-full placeholder:text-black  dark:placeholder:text-white placeholder:font-bold py-2 placeholder:tracking-wide outline-none text-xl font-bold active:bg-transparent focus:bg-transparent " >
                    </form>

                    <form action="?/updateUsername" method="POST" use:enhance>
                        <label for="username" class="opacity-40 text-md ">Username</label>
                        <input type="text" name="username" placeholder={`${data?.user?.username}`} class="placeholder:text-xl bg-transparent w-full placeholder:text-black  dark:placeholder:text-white placeholder:font-bold py-2 placeholder:tracking-wide outline-none text-xl font-bold active:bg-transparent focus:bg-transparent " >
                    </form>
                </div>

                <div class="w-full h-full justify-center items-center hidden">
                    <form action="?/updateInfo" method="POST" use:enhance>
                        <label for="username" class="opacity-40 text-md ">About me</label>
                        <div class="w-full h-full flex flex-col justify-center items-center py-2">
                            <Textarea name="username" placeholder={`${aboutme}`} class="w-full h-full min-h-[20vh] dark:placeholder:text-white placeholder:text-black" />
                        </div>
                    </form>
                </div>

                <div class="w-full h-full justify-center items-center">

                    <h2 class="text-2xl font-bold py-4">
                        About Me
                    </h2>

                    <!-- <h3 class="text-xl font-bold py-1">
                        Priorities
                    </h3> -->


                    <form action="?/updatePrios" method="POST" use:enhance>
                        <label for="priorities" class="opacity-40 text-md ">Priorities</label>
                        {#if showPrios}
                        <p
                            transition:fly={{ delay: 0, duration: 2000 }}
                             class="text-sm opacity-40 py-2">
                            Current priorities: {data?.user?.priorities}
                        </p>
                        {/if}
                        <label for="priorities" hidden class="opacity-40 text-md ">Priorities</label>
                        <div class="w-full h-full flex flex-col justify-center items-center py-4">
                            <input name="priorities" placeholder={`${data?.user?.priorities}`} class="w-full h-full py-3 dark:placeholder:text-white outline-none overflow-auto placeholder:text-black px-4 bg-transparent border-[1px] border-black dark:border-white border-opacity-20 dark:border-opacity-20 rounded-lg" on:input={() => {showPrios = true;}} />
                        </div>
                    </form>
                </div>
<!-- 
                <div class="w-full h-full justify-center items-center">
                    <h2 class="text-2xl font-bold py-4">
                        Appearance
                    </h2>

                    <Switch id="airplane-mode" />

                </div> -->

                <form action="/logout" method="POST" class="w-full h-full flex flex-col justify-center items-center">
                    <Button type="submit" >
                        Log Out
                    </Button>
                </form>

             
            </Card.Content>
            <!-- <Card.Footer>
                <Button class="w-full">
                <Check class="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </Card.Footer> -->
        </Card.Root>
    </div>
    {:else}
        <Skeleton class="h-[500px] w-[400px] rounded-xl drop-shadow-xl" />
    {/if}
</div>