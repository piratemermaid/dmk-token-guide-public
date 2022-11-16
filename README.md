# DMK Token Guide

## Purpose

This is a companion app to Disney Magic Kingdoms. It allows players to input their collection information, see token conflicts, and plan level-ups. The original purpose of this app was to display conflicting tokens for a searched character, intended to help prevent creating token conflicts with event characters, and it has grown tremendously from there. See it in action at https://dmktokenguide.com/

## Versions

I am currently using `node 16.4.0` and `npm 7.18.1`

## Scripts

-   `client`: Runs React code from top level directory
-   `server`: Runs server-side code from top level directory
-   `build-client`: Builds React code from top level directory
-   `update-main`: Merge dev to main, pushes both, and checks out dev again
-   `merge-dev`: Merge dev to main
-   `push-main`: Push dev and main
-   `updatedb`: Update db
-   `devnotes`: Update dev notes
-   `event`: Update event data and storyline
-   `storyline`: Update event storyline
-   `tc`: Update TC data
-   `manual`: Runs manual updates, generally things not covered by scripts

## Technologies

-   Frontend:
    -   React
    -   Create-react-app
    -   Redux
    -   React-query - replacing Redux
    -   Materialize CSS
    -   Material UI - replacing Materialize
-   Backend:
    -   Node
    -   Postgres
    -   Knex
    -   Bookshelf

## Updating data

-   The `updatedb` script covers most updates, but there are some limitations
-   If new characters are added, their tokens need to be added in `updateCharacterTokens.js` as well, and often `updatedb` needs to be run twice because it tries to add tokens to tasks before creating the tokens (I just haven't bothered to fix this)
-   The manual scripts are for things the other scripts don't cover, such as updating the level of a character for a task

## Deploying

-   Updates that are just data, no FE changes: run `update-main` and then `git pull` on the server and run whatever script(s) needed to update the data
-   FE changes:
    -   Increment app version in `App.js` and `devNotes.js` (and `CHANGELOG.md`)
    -   Merge dev to main and run a build (I don't bother keeping dev up to date with builds so I don't merge back to dev)
    -   Commit new build and push, then pull on server and run `devNotes` script

## How to Take Up the Mantle

If you're interested in running the site, I am happy to transfer ownership of the domain (it will expire soon though). Unfortunately I'm using my server for multiple other projects as well, so you would have to set up your own. I am currently running it on a Digital Ocean droplet that costs me $7-8 per month. Digital Ocean has good guides for setting things up. Feel free to build your own version, this repo has a lot of old spaghetti and if I had all the time in the world I would completely rebuild it.

Things I would recommend doing before deploying officially:

-   Update encryption - I am using an old method that requires a hardcoded secret, which means I can't hand over a db dump without potentially exposing everyone's passwords
-   Turn off email verification requirement, at least while everyone is signing up again (I have an auto-verification script that I set up to run every 10 mins to verify everyone when the app signups exceeded the amount of emails I could send with the service I was using)

A loose guide to deploying the project (it's been a few years since I did this, so I can't say definitively):

-   Set up secrets (see secrets_example.js)
-   Install postgres & create db
-   Knex - migrate latest then seed
-   Possibly run updatedb script to ensure everything is seeded correctly
-   Configure nginx (I added the nginx_config file, that's what I have currently)
-   Nginx file also contains certbot, not sure if you'd have to set that up again or if it'll work automatically with the nginx config (SSL cert for https)
-   I use pm2 to keep the server running always
-   The frontend should get served without pm2 from the nginx config - I run builds locally and commit and push them to the server, because running builds on the server takes too much memory

## Work in Progress

There's a lot of refactoring in the works that I just do not have time to complete.

-   Updating old class components to use hooks
-   Replacing redux with react-query
-   Replacing materialize-css with material ui

## Planned Work & User Requests

I added these as Git issues.
