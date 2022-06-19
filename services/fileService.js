const fs = require("fs/promises")
const path = require("path")
const {json} = require("express");

const dbPath = path.join(process.cwd(), "database", 'users.json');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath);
            return data.toString()
                ? JSON.parse(data.toString()).sort((a,b)=>a.id - b.id)
                : []
        } catch (e) {
            console.error(e)
        }

    },
    write: async (users) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(users))
        } catch (e) {
            console.error(e)
        }
    }
}