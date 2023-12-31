const convertUnixTimeToDate = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  let dd: string | number = date.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  let mm: string | number = date.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default convertUnixTimeToDate;
