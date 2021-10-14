require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { add, list, update, remove } = require("./utils/index");
const { connection } = require("./connection");
const { Author, Series, Title} = require("./models/Book");

const argv = yargs(hideBin(process.argv)).argv;

const main = async () => {
  try {
    await connection.authenticate();
    await Author.sync({ alter: true });
    await Series.sync({ alter: true });
    await Title.sync({ alter: true });
    // console.log(`Connection to ${process.env.DB_HOST} established.`);

      if (argv.add) {
        await add(argv);
      } else if (argv.list) {
        await list(argv);
      } else if (argv.remove && argv.id) {
        await remove(argv)
      } else if (argv.update && argv.id) {
          await update(argv);
      }

      await connection.close();
  } catch (error) {
      console.error(`Unable to connect to the DB: ${error}`);
  }

  process.exit();

};

main();


