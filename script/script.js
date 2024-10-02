import control from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import serviceStorage from './modules/serviceStorage.js';

const data = [];

const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = control;

const {
  getStorage,
} = serviceStorage;


const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    logo,
    btnAdd,
    formOverlay,
    btnDel,
    table,
    form,
  } = renderPhoneBook(app, title);

  // Функионал
  const storedContacts = getStorage('contacts');
  const allContacts = [...data, ...storedContacts];
  const allRow = renderContacts(list, allContacts);
  const {closeModal} = modalControl(btnAdd, formOverlay);

  hoverRow(allRow, logo);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal, allContacts);

  const saveSortKeyToStorage = (sortKey) => {
    localStorage.setItem('sortKey', sortKey);
  };

  const sortContacts = (sortKey) => {
    allContacts.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    const newAllRow = renderContacts(list, allContacts);
    hoverRow(newAllRow, logo);
    return newAllRow;
  };

  const sortTable = (target) => {
    const sortKey = target.dataset.sort;
    sortContacts(sortKey);
    saveSortKeyToStorage(sortKey);
  };

  const applySortFromStorage = () => {
    const sortKey = localStorage.getItem('sortKey');
    if (sortKey) {
      sortContacts(sortKey);
    }
  };

  applySortFromStorage();

  table.querySelector('thead').addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('thead__name')) {
      sortTable(target);
    }
  });
};

window.phoneBookInit = init;

export {init};
