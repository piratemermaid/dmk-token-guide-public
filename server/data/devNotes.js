module.exports = {
    version: "2.6.5", // increment with updates and increment in App.js too
    fix: [
        {
            desc: "Leveling page not loading for some users - I am working on refactoring the page entirely",
            inProgress: true
        },
        { desc: "Common tokens not showing up on Task Guide" },
        { desc: "Stats page showing wonky numbers" },
        { desc: "Send user to page they were on when logging in" }
    ],
    feature: [
        { desc: "Dropdown for character levels" },
        { desc: "Show happiness on tasks" },
        {
            desc: "Sort options for Task Guide (level/time/alphabetical)"
        },
        { desc: "Leveling page for attractions" },
        { desc: "Decorations tracking" },
        { desc: "Storyline progress tracking" },
        { desc: "Sub-sections in Stats for storyline and event characters" },
        { desc: "Show gems required for premium characters/attractions" },
        { desc: "Show amount of concessions user has of each type" },
        {
            desc: "Track what characters are out collecting or home based on who is not ready to level up (could use in Leveling page to help plan next level-up)"
        },
        { desc: "Leveling magic cost filter" },
        {
            desc: "Attraction Guide: show enchant info for all buildings in a group at once to help decide what to enchant next"
        },
        { desc: "Option to view conflicts by character or specific token" },
        {
            desc: "Feature requests page where users can submit and upvote requests"
        },
        { desc: "More actions for buildings on My Account page" }
    ],
    UI: [
        {
            desc: "Section categories for certain sorting types on concessions page"
        },
        { desc: "Nice animations while db is doing stuff" },
        { desc: "Just generally better UI" }
    ],
    done: [
        // {type:"", desc:"", date: "01/08/2022" },
        // Types: feature, add, change, fix, UI
        {
            type: "add",
            desc: "Ability to choose to sort tasks on Task Guide by time",
            date: "08/02/2022"
        },
        {
            type: "fix",
            desc: "Bug on Signup caused by email verification issue",
            date: "08/02/2022"
        },
        {
            type: "add",
            desc: "New Rescuers, Up, & upcoming TC info",
            date: "07/13/2022"
        },
        {
            type: "fix",
            desc: "Server went down, there were some wacky version issues that should be fixed now",
            date: "07/04/2022"
        },
        {
            type: "fix",
            desc: "Emails not getting sent - replaced broken email client",
            date: "07/04/2022"
        },
        {
            type: "fix",
            desc: "Bug where checking unobtained characters as ready wasn't correctly updating in the UI",
            date: "05/16/2022"
        },
        {
            type: "fix",
            desc: "Bug where Event page was displaying Striking Gold data",
            date: "05/01/2022"
        },
        {
            type: "change",
            desc: "Event page will display previous event details if no current regular event",
            date: "04/05/2022"
        },
        {
            type: "change",
            desc: "Updated post-event Robin Hood info",
            date: "04/05/2022"
        },
        {
            type: "change",
            desc: "Removed old mini event tokens from db as they seem to not repeat anymore",
            date: "04/05/2022"
        },
        {
            type: "change",
            desc:
                "A whole bunch of behind-the-scenes stuff that should help " +
                "a lot with loading times & keeping the app up to date!! " +
                "This is a huge ongoing effort that may take a while " +
                "and hopefully nothing breaks",
            date: "03/30/2022"
        },
        {
            type: "change",
            desc: "UI improvements to a couple pages",
            date: "03/30/2022"
        },
        {
            type: "add",
            desc: "New table for required levels per event chapter",
            date: "03/26/2022"
        },
        {
            type: "change",
            desc: "Keep storybook order up-to-date better on Characters and Attractions pages",
            date: "03/19/2022"
        },
        {
            type: "change",
            desc: "Leveling page: exclude Not Ready section from everyone ready to level up option",
            date: "03/04/2022"
        }
    ]
};
