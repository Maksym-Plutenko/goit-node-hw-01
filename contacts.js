const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// const x = 5;
// console.log(x);

// node contacts

// TODO: задокументувати кожну функцію

// get array of ALL contacts
async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

// get one contact by id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const selectedContact = contacts.find((cont) => cont.id === contactId);
  return selectedContact || null;
}

// remove one contact by id from contacts.json
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((cont) => cont.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  const newFileContent = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, newFileContent);
  return result;
}

// async function removeContact(contactId) {
//     const contacts = await listContacts();
//     const newContacts = contacts.filter(cont => !(cont.id === contactId));

//     if (contacts.length === newContacts.length) {
//       return null;
//     }
//     const newFileContent = JSON.stringify(newContacts, null, 2);
//     await fs.writeFile(contactsPath, newFileContent);
//     return newContacts;
//   }

// add contact to contacts.json
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const createdContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, createdContact];
  const newFileContent = JSON.stringify(newContacts, null, 2);
  await fs.writeFile(contactsPath, newFileContent);
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// node contacts
// listContacts();

// removeContact("AeHIrLTr6JkxGE6SN-0Rw");
// getContactById("AeHIrLTr6JkxGE6SN-0Rw");

// addContact('Vasia', 'vasia@gmail.com', '62626622626');
