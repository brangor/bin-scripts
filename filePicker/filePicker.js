// Description: Prompts user to choose a file from a given directory
// Usage: node file-picker.js <directory>
// Example: node file-picker.js payloads

const prompts = require('prompts');
const fs = require("fs");
const path = require("path");

// Lists files in given directory
async function listFiles(dir, metaData) {
  const directory = path.join(process.cwd(), dir);
  const files = await fs.promises.readdir(directory);
  return files.filter(file => {
    return !(file === 'meta.json' || (metaData[file] && metaData[file].ignore));
  });
}

// Prompts user to choose a file
// Returns the file name
async function chooseFile(dir) {
  const metaFilePath = path.join(process.cwd(), dir, 'meta.json');
  // Try to load metadata, if it exists
  let metaData = {};
  try {
    metaData = require(metaFilePath);
  } catch (error) {
    console.warn('No metadata file found. Descriptions will not be available.');
  }

  const files = await listFiles(dir, metaData);

  if (files.length === 0) {
    console.log("No files found");
    return;
  }

  const questions = [
    {
      type: "select",
      name: "file",
      message: "Choose a file",
      choices: [
        ...files.map((file) => ({
          title: metaData[file] ? `${file} - ${metaData[file].description}` : file,
          value: file
        })),
        { title: "Exit", value: "exit" },
      ],
    },
  ];

  const response = await prompts(questions);

  if (response.file === "exit" || response.file === undefined) {
    console.log("Nevermind then!");
    process.exit(0);
  }

  if (response.file !== undefined) {
    // Show the usage line from meta.json if it exists
    if (metaData[response.file] && metaData[response.file].usage) {
      console.log(`\tUsage: ${metaData[response.file].usage}`);
    }
    return response.file;
  }
}

// Main function

if (process.argv.length !== 3) {
  console.log("Usage: node file-picker.js <directory>");
  console.log("Example: node file-picker.js payloads");
  return;
}

const dir = process.argv[2];
chooseFile(dir);
