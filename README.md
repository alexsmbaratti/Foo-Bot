# Foo Bot

A simple Discord bot to manage your server

## Features

### User-Assignable Roles

Allow users to quickly and easily assign themselves roles using slash commands. Simply specify which roles you'd like
users to be able to self-assign in the `config.json` file.

### Turing Roles

When a new user joins your server, Foo Bot will automatically assign them a Human or Bot role to help organize your
member list.

## Setup

### Requirements

* Node.js v16.6.0 or later
* A Discord account with a Discord bot application
* Permission to add a bot to a Discord server

Note: This bot is intended to only handle a single server.

### Config.json

1. Create a file called `config.json` in the project directory
2. Copy the contents of `example-config.json` into `config.json`
3. Replace the placeholder values with that of your own

Note: At this time, the bot will not create roles for you. Specified roles should already be present in the server. This
goes for both user-assignable roles and Turing roles.

### Running

To create the slash commands for your server, run the deploy-commands.js file. This only needs to be run whenever the
commands are changed.

```bash
node deploy-commands.js
```

Then, simply run the index.js file using Node.js. Run this command whenever you want the bot to be online.

```bash
node index.js
```