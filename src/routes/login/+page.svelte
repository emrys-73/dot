<script lang="ts">
    import { Button } from "$lib/components/ui/button/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Label } from "$lib/components/ui/label/index";

    const pw = "Forgot my password :,("
  </script>
  
  <div class="w-full lg:grid h-full min-h-screen lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Look who's back
          </p>
        </div>
        <form action="?/login" method="POST" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="/resetpassword" class="ml-auto inline-block text-sm underline">
                {pw}
              </a>
            </div>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" class="w-full">Login</Button>
          <!-- <Button variant="outline" class="w-full">Login with Google</Button> -->
        </form>
        <div class="mt-4 text-center text-sm">
          Else just
          <a href="/signup" class="underline"> create an account </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block overflow-hidden h-full max-h-screen">
      <img
        src="/ban.png"
        alt="placeholder"
        class="h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
      />
    </div>
  </div>
  