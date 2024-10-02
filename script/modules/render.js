import * as createElements from './createElements.js';

// const {
//   createHeader,
//   createLogo,
//   createMain,
//   createButtonsGroup,
//   createTable,
//   createForm,
//   createFooter,
//   createRow,
// } = createElements;

export const renderPhoneBook = (app, title) => {
  const header = createElements.createHeader();
  const logo = createElements.createLogo(title);
  const main = createElements.createMain();
  const buttonGroup = createElements.createButtonsGroup([
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
  const table = createElements.createTable();
  const {form, overlay} = createElements.createForm();
  const footer = createElements.createFooter(title);

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

export const renderContacts = (elem, data) => {
  elem.innerHTML = '';
  const allRow = data.map(createElements.createRow);
  elem.append(...allRow);
  return allRow;
};
