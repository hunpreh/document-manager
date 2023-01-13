import { message } from "antd";

const CODE_PATTERN = /[a-zA-Z]+-[0-9]+/i;
const FILENAME_PATTERN = /^[^\\\/<>!\?%@#\$&\*:\.\|]+$/i;

const codeError = () => {
  message.warn(
    `El código del archivo esta compuesto de 6 letras A-Z, guion intermedio y tres números del 0-9, siguiendo el formato de ejemplo: ABCDEF-000`
  );
};

const charError = () => {
  message.warn(
    `El nombre del archivo no puede contener los siguientes caracteres: \u005C / < > ! ? % @ # $ & * : . | "`
  );
};

export const codeVerify = (codeStr) => {
  if (codeStr.length < 10 || !CODE_PATTERN.test(codeStr)) {
    codeError();
    return false;
  } else if (!FILENAME_PATTERN.test(codeStr)) {
    charError();
    return false;
  } else return true;
};

export const titleVerify = (titleStr) => {
  if (titleStr.length > 32 || titleStr.length === 0) {
    message.error(
      "El nombre del archivo no puede estar en blanco, ni tener más de 32 caracteres."
    );
    return false;
  } else if (!FILENAME_PATTERN.test(titleStr)) {
    charError();
    return false;
  } else return true;
};
