import moment from "moment/moment";
import "moment/locale/es-mx";
moment.locale("es");

const format = "MMM DD YYYY, hh:mm:ss a";

export function getCurrentDate() {
  const date = moment(Date.now()).format(format);
  return date;
}

export function getLastModif(date) {
  const oldDate = moment(date, format);
  const lastM = moment(oldDate).fromNow();
  return lastM;
}

export function isOld(date) {
  const oldDate = moment(date, format);
  const dif = moment().diff(oldDate, "days");
  if (dif >= 7) return true;
  return false;
}
