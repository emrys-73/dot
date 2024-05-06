<script>
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="w-full h-full min-h-screen flex flex-col justify-center items-center px-8">
    <div>
        <h1
            class="text-4xl font-bold"
            >You're in!</h1>
    </div>
    <div class="w-[40vw]  md:w-[20vw] transition-all duration-300 ease-in-out">
        <!-- Hedgehog -->
        <img src="/rick.png" alt="Rick" class="w-full h-full">
    </div>
    <div class="py-4">
        <p class="text-center">
            Check your EMail to verify your account and come back when you are ready.
        </p>
    </div>

    <form action="?/verified" method="POST" class="py-4">

        <Button type="submit" class="">
            I've verified my EMail
        </Button>
    </form>
</div>