// Format date as DD/MM/YYYY
export default function formatDate(dateString) {
  const timestamp = Number(dateString);
  const options = { day: "2-digit", year: "numeric", month: "2-digit" };
  return new Date(timestamp)
    .toLocaleDateString("en-GB", options)
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
}
