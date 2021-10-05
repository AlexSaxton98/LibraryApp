require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const {add, list, update, remove} = require("./utils/index") 

const main = () => {
    if (argv.add){
        add(argv.author, argv.series, argv.title)
    } else if (argv.list) {
        list(argv.author, argv.series, argv.title)
    }
}

main();