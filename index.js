const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      return console.log(contactList);
      break;

    case "get":
      const result = await getContactById(id);
      return console.log(result);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
