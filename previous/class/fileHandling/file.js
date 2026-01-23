//common error

// ENONET = FILE NOT EXIST
// EACCESS= PERMISSION DENIED
// EEXIST= FILE ALREADY EXIST
// EISDIR= FILE EXPECTED, FOLDER NOT EXISTS

// Error handling with call back

const fs = require('fs');
// fs.readFile("./notes.txt","utf-8",(err,data)=>{
//     if(err){
//         if(err.code === "ENOENT"){
//             console.log("File not found");
//         }
//         return ;
//     }
//     console.log(data);
// });

//error handling with async/await
// const fsPromises = require("fs").promises;
// async function readFileSafe() {
//     try{
//         const data = await fsPromises.readFile("./data.txt","utf-8");
//         console.log(data);
//     }
//     catch(err){
//         console.log("Error: ",err.code );
//     }
// }


// Stream Error Handling

// const readStream = fs.createReadStream("./sample.txt");
// const writeStream = fs.createWriteStream("./source.txt");

// readStream.on("error",(err)=>{
//     console.log("Read error:",err.message);
//     writeStream.destroy();
// });

// writeStream.on("error",(err)=>{
//     console.log("Write error:",err.message);
//     readStream.destroy();
// });



