'use strict';

const data = [];

{
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

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');

    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="thead__name" data-sort="name">Имя</th>
        <th class="thead__name" data-sort="surname">Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
      `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
        id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
        id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
        id="phone" type="number" required>
      </div>
    `);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = title => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    footer.insertAdjacentHTML('beforeend', `
      <p>Все права защищены &#169; ${title}</p>
    `);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
      table,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn-edit');
    buttonEdit.insertAdjacentHTML('beforeend', `
      <img class="btn-edit-icon" 
      src="../img/edit.png" 
      alt="кнопка редактировать">`)
    tdEdit.append(buttonEdit);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    elem.innerHTML = '';
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

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
}