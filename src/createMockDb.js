const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const user = mockData;
const data = JSON.stringify(user);
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
    err ? console.log(err) : console.log("Mock DB created.");
});
