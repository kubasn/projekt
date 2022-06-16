let minCharacters = (value, minChar) => {
  return value.length >= minChar
    ? ""
    : `za mało znaków, min. ${minChar} znaków`;
};

let required = (value) => {
  return value.length >= 1 ? "" : "pole wymagane";
};

let urlCheck = (value) => {
  let expression =
    /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g;
  var regex = new RegExp(expression);
  return value.match(regex) ? "" : "podano zły link";
};

let numberRequired = (value) => {
  const pattern = /^[0-9]+$/;
  let test = pattern.test(value);
  return test ? "" : "wymagana liczba";
};

const chooseValidationType = {
  minCharacters,
  required,
  numberRequired,
  urlCheck,
};

const validations = (value, validationType = []) => {
  let error = "";
  validationType.map((rule, key) => {
    if (rule instanceof Object) {
      const errorLog = chooseValidationType[rule.rule](value, rule.value);
      if (errorLog) error = errorLog;
    } else {
      const errorLog = chooseValidationType[rule](value);
      if (errorLog) error = errorLog;
    }
  });
  return error ? error : "";
};

export default validations;
