import createElements from './createElements.js';
import serviceStorage from './serviceStorage.js';

const {
  createRow,
} = createElements;

const {
  setStorage,
  removeStorage,
} = serviceStorage;

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const contact = target.closest('.contact');
      const phone = contact.querySelector('a').textContent;
      removeStorage(phone.trim());
      contact.remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal, allContacts) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    const addContactData = contact => {
      data.push(contact);
      setStorage('contacts', contact);
      allContacts.push(contact);
    };

    addContactData(newContact);
    addContactPage(newContact, list);
    form.reset();
    closeModal();
  });
};

export default {
  hoverRow
  modalControl,
  deleteControl,
  formControl,
};