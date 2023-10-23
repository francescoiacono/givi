export const formatDateLong = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = Intl.DateTimeFormat('en', options).format(date);

  return formattedDate;
};

export const formateDateShort = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = Intl.DateTimeFormat('en', options).format(date);

  return formattedDate;
};
