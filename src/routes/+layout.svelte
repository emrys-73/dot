<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import Sun from "svelte-radix/Sun.svelte";
    import Moon from "svelte-radix/Moon.svelte";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index";
    import * as Avatar from "$lib/components/ui/avatar";
    
    export let data;
</script>


<ModeWatcher />

<div class="w-full h-full relative flex bg-[url('/lightbg.png')] dark:bg-[url('/darkbg.png')]">
  <div class="w-full h-16 bg-black bg-opacity-0 absolute top-0 z-30 justify-between px-4 flex drop-shadow-lg items-center">
  <div class="">
    <a href="{data.userPath}">
      <img src="/logo.png" alt="DOT" class="h-9 transition-all duration-300 ease-in-out opacity-100 dark:opacity-0 flex dark:hidden">
      <img src="/logo_darkMode.png" alt="DOT" class="h-9 transition-all duration-300 ease-in-out dark:opacity-100 opacity-0 hidden dark:flex">
    </a>
  </div>

  <div>
    {#if !data.dotUser}
      <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
    {:else} 
    <div class="flex flex-row justify-center items-center gap-2">
      <Button href="/{data.dotUser.username}/settings" variant="outline" class="h-full flex flex-row gap-3 justify-center items-center px-6 py-1">
        <div>
          <span class=" font-medium text-xl">
            {data.dotUser.username}
          </span>
        </div>
        <div class="rounded-full justify-center items-center overflow-hidden">
          <!-- <img src="{data.user.profile_picture_url}" alt="pic"> -->
          <Avatar.Root class="w-8 h-8 rounded-full">
            <Avatar.Image src="{data.dotUser.profile_picture_url}" alt="pic" class="" />

            <!-- <Avatar.Fallback>{data?.user?.username[0]}{data?.user?.username[1]}</Avatar.Fallback> -->
            <Avatar.Fallback>{data?.dotUser?.username[0]}</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </Button>

      <Button on:click={toggleMode} variant="outline" size="icon" class="h-11 w-11">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </div>
        
    {/if}
  </div>


  </div>
  
  <slot />

</div>