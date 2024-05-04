<script lang="ts">
    import { Button } from "$lib/components/ui/button/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Label } from "$lib/components/ui/label/index";
  </script>
  
  <div class="w-full lg:grid h-full min-h-screen lg:grid-cols-2">
    <div class="hidden bg-muted lg:block overflow-hidden h-full max-h-screen">
        <img
          src="/ban.png"
          alt="placeholder"
          class="h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Sign Up</h1>
          <p class="text-balance text-muted-foreground">
            About time to get started
          </p>
        </div>
        <div class="grid gap-4">
            <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input id="username" type="text" placeholder="" required />
            </div>
            <div class="grid gap-2">
                <Label for="name">Full Name</Label>
                <Input id="name" type="text" placeholder="" required />
            </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="passwordConfirm">Confirm Password</Label>
            </div>
            <Input id="passwordConfirm" type="password" required />
          </div>
          <Button type="submit" class="w-full">Sign Up</Button>
          <!-- <Button variant="outline" class="w-full">Login with Google</Button> -->
        </div>
        <div class="mt-4 text-center text-sm">
          Else just
          <a href="/login" class="underline"> log in here </a>
        </div>
      </div>
    </div>
    
  </div>
  