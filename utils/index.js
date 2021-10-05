const fs = require("fs");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid")

const saveData = (data) => {
    try{fs.writeFileSync("data.json", JSON.stringify(data))
} catch(error){
    console.log(error)
}
};


const loadData = () => {
    try{
        const buffer = fs.readFileSync("data.json");
        return JSON.parse(buffer.toString());
    } catch(error) {
        return[]
    }
};

const makeID = () => customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();

const add = (author, series, title, id = false) => {
    saveData([...loadData(), {id: id || makeID(), author, series, title}])
}
const list = (author, series, title) => {
    console.log(loadData())
    //list by Author
    //List by Series
}
const update = (author, series, title) => {
    console.log(`Update to ${title} in ${series} by ${author}`)
}
const remove = (author, series, title) => {
    console.log(`Deleting ${title} in ${series} by ${author}`)
}

module.exports = {add, list, update, remove}