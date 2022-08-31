const verifyAllUsers = require("./verifyAllUsers");

// verify all users every 15 mins
setInterval(async function () {
    await verifyAllUsers();
}, 900000);
