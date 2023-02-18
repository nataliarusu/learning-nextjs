import { parseISO, format } from "date-fns"; //intalled

export default function Date({ dateString }) {
  const date = parseISO(dateString); //"2020-01-01" into => January 1, 2020
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
