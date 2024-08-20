const { resolve } = require("path");

const dbPath = resolve("./db/database.json");
const config = {
    db: {
        path: dbPath,
    },
};

module.exports = Object.freeze(config);
