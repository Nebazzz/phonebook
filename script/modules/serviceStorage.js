const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorage = (key, newContact) => {
  const contacts = getStorage(key);
  contacts.push(newContact);
  localStorage.setItem(key, JSON.stringify(contacts));
};

const removeStorage = (phone) => {
  let contacts = getStorage('contacts');
  contacts = contacts.filter(contact => contact.phone !== phone);
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};