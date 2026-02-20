const fs = require('fs').promises;
const path = './employees.json';

const fileHandler = {
    read: async () => {
        try {
            const data = await fs.readFile(path, 'utf8');
            return JSON.parse(data || '[]');
        } catch (error) {
            return [];
        }
    },
    write: async (data) => {
        try {
            await fs.writeFile(path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error writing to file:", error);
        }
    }
};

module.exports = fileHandler;