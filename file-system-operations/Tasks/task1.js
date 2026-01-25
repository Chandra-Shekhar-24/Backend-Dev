const fs = require('fs').promises;
const path = require('path');

function showHelp() {
    console.log(`How to use: node fileManager.js <command> <arguments>`);
}

async function readFile(filename) {
    try {
        const content = await fs.readFile(filename, 'utf8');
        console.log(`\n ${filename}:\n`);
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File "${filename}" not found`);
        } else if (error.code === 'EACCES') {
            console.log(`Cannot read "${filename}" - No permission`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function writeFile(filename, text) {
    try {
        await fs.writeFile(filename, text, 'utf8');
        console.log(`Created "${filename}"`);
    } catch (error) {
        if (error.code === 'EACCES') {
            console.log(`Cannot write to "${filename}" - No permission`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function appendFile(filename, text) {
    try {
        await fs.appendFile(filename, text + '\n', 'utf8');
        console.log(`Added to "${filename}"`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File "${filename}" not found`);
        } else if (error.code === 'EACCES') {
            console.log(`Cannot write to "${filename}" - No permission`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}
async function copyFile(file1, file2) {
    try {
        await fs.access(file1);
        const data = await fs.readFile(file1);
        await fs.writeFile(file2, data);
        console.log(`Copied "${file1}" to "${file2}"`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File "${file1}" not found`);
        } else if (error.code === 'EACCES') {
            console.log(`No permission to copy`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function deleteFile(filename) {
    try {
        await fs.unlink(filename);
        console.log(`Deleted "${filename}"`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File "${filename}" not found`);
        } else if (error.code === 'EACCES') {
            console.log(`Cannot delete "${filename}" - No permission`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function listFiles(folder = '.') {
    try {
        const files = await fs.readdir(folder);

        console.log(`\nFiles in "${folder}":\n`);

        if (files.length === 0) {
            console.log("(Empty folder)");
        } else {
            for (let file of files) {
                try {
                    const filepath = path.join(folder, file);
                    const stats = await fs.stat(filepath);

                    if (stats.isDirectory()) {
                        console.log(`${file}/`);
                    } else {
                        console.log(`${file}`);
                    }
                } catch {
                    console.log(`${file} (cannot read)`);
                }
            }
            console.log(`\nTotal: ${files.length} items`);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Folder "${folder}" not found`);
        } else if (error.code === 'EACCES') {
            console.log(`Cannot access "${folder}" - No permission`);
        } else if (error.code === 'ENOTDIR') {
            console.log(`"${folder}" is not a folder`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        showHelp();
        return;
    }

    const command = args[0].toLowerCase();
    const params = args.slice(1);
    switch (command) {
        case 'read':
            if (params.length < 1) {
                console.log('Please provide filename');
                console.log('Usage: read <filename>');
                return;
            }
            await readFile(params[0]);
            break;

        case 'write':
            if (params.length < 2) {
                console.log('Please provide filename and text');
                console.log('Usage: write <filename> "<text>"');
                return;
            }
            await writeFile(params[0], params.slice(1).join(' '));
            break;

        case 'append':
            if (params.length < 2) {
                console.log('Please provide filename and text');
                console.log('Usage: append <filename> "<text>"');
                return;
            }
            await appendFile(params[0], params.slice(1).join(' '));
            break;

        case 'copy':
            if (params.length < 2) {
                console.log('Please provide source and destination files');
                console.log('Usage: copy <source> <destination>');
                return;
            }
            await copyFile(params[0], params[1]);
            break;

        case 'delete':
            if (params.length < 1) {
                console.log('Please provide filename');
                console.log('Usage: delete <filename>');
                return;
            }
            await deleteFile(params[0]);
            break;

        case 'list':
            const folder = params[0] || '.';
            await listFiles(folder);
            break;

        case 'help':
            showHelp();
            break;

        default:
            console.log(`Unknown command: "${command}"`);
            console.log('Type "node fileManager.js help" for usage');
            break;
    }
}
main();