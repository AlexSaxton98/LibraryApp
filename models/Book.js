const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Author = connection.define("Author",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
})

const Series = connection.define("Series",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
})

const Title = connection.define("Title",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
})

Series.belongsTo(Author, {onDelete: "cascade"});
Title.belongsTo(Series, {onDelete: "cascade"});

module.exports = {Author, Series, Title}







// const Book = connection.define("Book", {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },

//     author: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     series: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     indexes: [{ unique: true, fields: ["title"] }]
// });

// exports.Book = Book;
