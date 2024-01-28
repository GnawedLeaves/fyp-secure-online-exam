export const handleFirebaseDate = (inputDate) => {
  const date = new Date(
    inputDate.seconds * 1000 + inputDate.nanoseconds / 1000000
  );
  const dateString = date.toString();
  const extractedDateString = date.toUTCString().slice(0, -7);
  return extractedDateString;
};
