const fs = require("fs");
const path = require("path");

// const sortBoysFolder = () => {
//     fs.readdir('./boys', (err, files) => {
//         if(err) return console.log(err);
//         files.forEach((file) => {
//             const readfile =path.join(__dirname, "boys", file)
//             fs.readFile(readfile, (err, data) => {
//                 if(err) return console.log(err);
//                 const user = JSON.parse(data.toString())
//                 if(user.gender === 'female'){
//                     fs.rename(readfile, path.join(__dirname, "girls", file), (err)=>{
//                         if(err) return console.log(err);
//                     })
//                 }
//             })
//         })
//     })
// }
// sortBoysFolder()

const sortFolder = (read, gender, write) => {
    fs.readdir(path.join(__dirname, read), (err, files) => {
        if(err) return console.log(err);

        files.forEach((file) => {
            const readfile =path.join(__dirname, read, file)
            fs.readFile(readfile, (err, data) => {
                if(err) return console.log(err);

                const user = JSON.parse(data.toString())

                if(user.gender === gender){
                    fs.rename(readfile, path.join(__dirname, write, file), (err)=>{
                        if(err) return console.log(err);
                    })
                }
            })
        })
    })
}
sortFolder("girls", "male", 'boys')
sortFolder("boys", "female", 'girls')