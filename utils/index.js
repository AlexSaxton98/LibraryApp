// const fs = require("fs");
// const path = require("path");
// const { nanoid, customAlphabet } = require("nanoid");
// const { match } = require("assert");

// const saveData = (data) => {
//     try{fs.writeFileSync("data.json", JSON.stringify(data))
// } catch(error){
//     console.log(error)
// }
// };


// const loadData = () => {
//     try{
//         const buffer = fs.readFileSync("data.json");
//         return JSON.parse(buffer.toString());
//     } catch(error) {
//         return[]
//     }
// };

// const makeID = () => customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();


const { Author, Series, Title } = require ("../models/Book")

const add = async ({add, name, id}) => {
    if (add === "author"){
        await Author.create({name})
    } else if (add === "series"){
        const author = await Author.findByPk(id);
        await Series.create({name, AuthorId: author.id})
    } else if (add === "title") {
        const series = await Series.findByPk(id);
        await Title.create({name, SeriesId: series.id})
    }
}
const list = async ({list}) => {

    let results = [];

    if (list === "author") {
        results = await Author.findAll({attributes: ["id", "name"]})
    } else if (list === "series") {
        results = await Series.findAll({attributes: ["id", "name", "AuthorId"]})
    } else if (list === "title") {
        results = await Title.findAll({attributes: ["id", "name", "SeriesId"]})
    }

    console.table(results.map(result => result.dataValues))


    // const books = await Book.findAll();
    //     console.log("\n");
    //     for(book of books) {
    //         console.log(`ID:\t${book.id}\nTitle:\t${book.title}\nAuthor:\t${book.author}\nSeries:\t${book.series}\n\n`);}
}
const remove = async ({remove, id}) => {
    if (remove === "series") {
        await Series.destroy({where: { id } })
    } else if(remove === "author"){
        await Author.destroy({where: { id } })
    } else if(remove === "title") {
        await Title.destroy({where: { id } })
    }
}

const update = async ({update, id, name, series, author}) => {
    if (update === "author") {
        const writer = await Author.findByPk(id);
        await Author.update ({name: name || writer.name}, {where: {id} })
    } else if (update === "series") {
        const books = await Series.findByPk(id)
        await Series.update({name: name || books.name, AuthorId: author || books.AuthorId}, {where: {id} } )
    } else if (update === "title") {
        const book = await Title.findByPk(id);
        await Title.update({name: name  || book.name, SeriesId: series || book.id}, {where: {id} })
    }
    
    
    
    
    // const book = Book.findAll({where: {id}})
    // await Book.update({
    //      title: title || book.title,
    //      author: author || book.author,
    //      series: series || book.series },
    //     { where: { id } })
}
module.exports = {add, list, update, remove}