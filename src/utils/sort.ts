import parse from 'date-fns/parse';

const sortByDateKey = (key: string) => (a, b) => {
  const dateA: any = parse(a[key]);
  const dateB: any = parse(b[key]);
  return dateA - dateB;
};

export const sortByDateAdded = sortByDateKey('date_added');
export const sortByDateAltered = sortByDateKey('date_altered');