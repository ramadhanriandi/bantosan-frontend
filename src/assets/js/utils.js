const convertCurrency = value => value.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

const convertDate = (date) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getDate();

  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];

  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
};

const cutString = (string, maxLength) => (string.length > maxLength ? `${string.substring(0, maxLength)}...` : string);

const getDaysLeft = (date) => {
  const delta = date.getTime() - new Date().getTime();
  if (delta < 0) {
    return 0;
  }
  return parseInt((delta / (1000 * 3600 * 24)), 10);
};

const getPercentage = (a, b) => parseInt((a / b * 100), 10);

const isNumberOnly = (string) => {
  const re = /^\d+$/;
  return re.test(string);
};

const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validName = (string) => {
  const re = /^[a-zA-Z ]*$/;
  return re.test(string);
};

export default {
  convertCurrency,
  convertDate,
  cutString,
  getDaysLeft,
  getPercentage,
  isNumberOnly,
  validEmail,
  validName,
};
