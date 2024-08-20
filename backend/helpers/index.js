const fs = require("fs/promises");

module.exports.getFileData = async function (path) {
    const data = await fs.readFile(path, { encoding: "utf8" });
    return JSON.parse(data);
};

module.exports.setFileData = async function (path, data) {
    fs.writeFile(path, JSON.stringify(data));
};

module.exports.getUniqueId = function () {
    return JSON.stringify(Date.now());
};
