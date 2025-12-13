---
title: "Storytime: I got hacked by a simple npm start."
summary: "Hacked, but I survived and set up an isolated Docker sandbox to safely test code."
date: "Nov 18 2025"
draft: true
tags:
- Docker
- NodeJs
- Sandbox
- Malware Protection
---
You know that rush when you crush the HR interview and they hit you with:
>"Great, we're sending over the technical assessment"?

It’s your time to shine.
Time to prove you’re the 10x Fullstack Dev the legends spoke of 🫡.

Well, last week that adrenaline rush turned into straight-up **panic**.
Spoiler alert: I ended up nuking my hard drive and reinstalling Windows. 🤡

Here’s the story of how I fell for a pretty sophisticated trap disguised as a job offer, and how I now use a **Two-Phase Docker Protocol** to handle sketchy code without sweating bullets.

## 🎣 The Bait: The "Take-Home Assignment"

Everything looked legit. I got scouted for a Fullstack role. Good pay, modern stack: **React + Vite** frontend, **Express** backend.

— *"Send us your GitHub handle, we'll invite you to a private repo,"* they said.

— *"You got it,"* I said. Innocent. Clueless. 🕊️

I cloned the repo. `npm install`. Standard procedure.
But the moment I spun up the backend...

**BOOM...** 💥

## 🕵️‍♂️ The Trojan Horse: *an obfuscate js code hidden in the backend logic.*

Inside the server folder (`express`), there was a file named `auth.js`.

Looks like normal auth logic, but in the last line... It was a massive block of **obfuscated JavaScript** (a mess of `_0x5f3e` variables). When I ran the server, that script wasn't logging me in—it was **executing commands on my File System**, likely scraping my session tokens and shipping them off to a server in who-knows-where.

Result: A full system wipe. **Big F in the chat.**

## 🛡️ The Solution: The "Air-Gapped" Workflow

I learned my lesson: **NEVER run unknown code on bare metal.**

But here is the problem every dev faces:
1.  If you run the container **without internet**, `npm install` fails.
2.  If you run it **with internet**, `npm install` triggers malicious `postinstall` scripts (where the virus usually lives) and you get pwned instantly.

The solution? **The Two-Phase Protocol.**

### Step 1: Build the Bunker (Do this once)

First, let's build our reusable image. Create a file named `Dockerfile.sandbox`:

```dockerfile
FROM node:alpine
WORKDIR /app
# Create a non-root user setup
RUN chown -R node:node /app
USER node
ENV NPM_CONFIG_CACHE=/tmp/.npm
```

Build the Image once and keep it forever:
Think of this image as your **Sandbox Base**. It’s immutable. It contains the environment, the user rules, and the OS.
```bash
docker build -t node-sandbox -f Dockerfile.sandbox .
```

### Step 2: The Tactical Supply Run (Secure Install)

We need to download the dependencies (`node_modules`), but we **cannot** let any scripts run. Malware loves to hide in the `preinstall` or `postinstall` hooks of `package.json`.

We run a temporary container **WITH internet**, but we muzzle `npm` using the `--ignore-scripts` flag.

```bash
docker run --rm \
  -v "${PWD}:/app" \
  -w /app \
  node:alpine \
  npm install --ignore-scripts --no-audit
```

**What just happened?**
*   We used a stock Node image to fetch packages.
*   `--ignore-scripts`: This is the GOAT. It tells npm: "Download the files, but DO NOT execute anything."
*   Because we mounted the volume (`-v`), the `node_modules` folder now exists on your local machine, but the virus inside it hasn't been triggered.

### Step 3: The Air-Gapped Execution (The Real Test)

Now that we have the dependencies locally, we cut the cord. We spin up our **Sandbox Image** with **ZERO internet access**.

```bash
docker run --rm -it \
  --network none \       # 🚫 No internet. Data exfiltration is impossible.
  --read-only \          # 🔒 Read-Only FS. Stops ransomware.
  --tmpfs /tmp \         # 🧠 Temp RAM for cache.
  -v "${PWD}:/app" \     # 📂 Mount the code (including the node_modules we just got).
  node-sandbox \         # 🐳 Our custom secure image.
  node index.js          # 🚀 Run the suspicious file.
```

### 🧠 Why is this bulletproof?

1.  **During Install:** The malware couldn't run because of `--ignore-scripts`.
2.  **During Run:** The malware might *try* to run now, but:
    *   It tries to phone home? **Blocked** (Network none).
    *   It tries to encrypt your disk? **Blocked** (Read-only FS).
    *   It tries to install a rootkit? **Blocked** (User is `node`, not root).

## 📝 The Takeaway

Being a dev isn't just about writing clean code; it's about OpSec (Operational Security).

If you are interviewing or checking out open-source repos, **don't trust. Verify.**
With this Two-Phase setup, I can download the sketchiest repo on GitHub, fill up the `node_modules` safely, and then laugh as the malware screams into the void inside my air-gapped container.

**Build your sandbox once. Reuse it forever.**

Stay safe out there and keep your containers tight! 🐳🔒

---


## 🍿 *Coming Soon: Facing the Beast*

Okay, so we’ve got the suspect handcuffed in the back of the squad car (our air-gapped container). But is it actually guilty, or am I just paranoid?

In the **next post**, I’m going to go full **Mr. Robot**. I’ll show you how to step inside that container to perform a **Forensic Audit** without blowing up your PC:

- 🕵️‍♂️ **De-obfuscation:** How to turn that _0x5f3e garbage back into readable code.
- 🔬 **System Tracing:** Watching exactly which files the virus tries to touch.
- 💥 **The Detonation:** Letting the malware run and analyzing the carnage safely.

You don't want to miss that one. **Follow me** so you get notified when we dissect the beast. 🦠