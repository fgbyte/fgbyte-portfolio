---
title: "Dealing with Monorepo's Hell with Bun"
summary: "Installing Dependencies in Monorepo Workspaces with Bun (Without Losing Yourself)"
date: "Aug 14 2025"
draft: false
tags:
- Turborepo
- Bun
- Monorepo
---

So you're rocking a monorepo with Turborepo and Bun 🫂.

If you've tried installing dependencies in a specific workspace and ended in your root *package.json*, you're not alone my friend. Bun's workspace handling is a bit... different HELL. Here's how to make it behave.

### The Gotcha

You might think you can do something like:

```bash
bun add express --filter server
````

But surprise! That lands `express` in the root `package.json`, not in `apps/server` like you wanted. Bun doesn’t play the same way as other package managers when it comes to workspace filters.

## The Fix

Use the `--cwd` flag to tell Bun exactly where to drop the goods:

```bash
bun add <package-name> --cwd <workspace-path>
```

### 🗣️ BECAUSE THE SUPPORT IS IN BETAAAAAA!!!!
At the moment 2025 august, maybe tomorrow works 🙂

### Sample Monorepo Layout

Just to set the scene:

```
my-monorepo/
├── apps/
│   ├── native/          # React Native app
│   └── server/          # Node.js server
├── packages/
│   └── shared/          # Shared utilities
├── package.json         # Root config
├── turbo.json
└── bun.lockb
```

## Real-World Installs

### Server Workspace

```bash
bun add express --cwd apps/server
bun add -d @types/node --cwd apps/server
bun add express cors helmet --cwd apps/server
```

### Native Workspace

```bash
bun add react-native-vector-icons --cwd apps/native
bun add -d @types/react --cwd apps/native
```

### Shared Package

```bash
bun add lodash --cwd packages/...😐 Got it dude?
```

## Why `--cwd` Is Your Friend

It basically tells Bun: “Hey, pretend you’re inside this folder when you run the command.” That way:

- Dependencies go to the right `package.json`
- Bun respects your workspace setup
- The lockfile stays clean and centralized

## The Old-School Way (meh)

You could `cd` into the workspace and run `bun add` there:

```bash
cd apps/server
bun add express
cd ../..
```

But that creates a local `node_modules` folder, which kinda messes with the monorepo vibe. Using `--cwd` keeps things tidy and lets you stay at the root like a boss.

## Turborepo Plays Nice

This method works perfectly with Turborepo’s caching and task runner:

```bash
turbo build --filter=server
turbo build
```

No hiccups. Just smooth builds.

## Pro Tips from the Trenches

1. ✅ Double-check your `package.json`—make sure the dependency landed where you wanted.
2. 🛠️ Add some helper scripts to your root `package.json`:
    
    ```json
    {
      "scripts": {
        "add:server": "bun add --cwd apps/server",
        "add:native": "bun add --cwd apps/native"
      }
    }
    ```
    
3. 🔒 Bun updates the `bun.lockb` file automatically, so your lockfile stays in sync.

## Wrap-Up

If you're working with Bun in a Monorepo setup, `--cwd` is your golden ticket to clean, workspace-specific installs. No more rogue dependencies in the root. Just run:

```bash
bun add <package> --cwd <workspace-path>
```

🧘‍♂️ Don't thanks me,  give me a coffee !