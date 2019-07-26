export interface DateProperties {
  date_added: string | null;
  date_altered: string;
}

interface DatabaseObject extends DateProperties{
  id: number;
}

export default DatabaseObject;