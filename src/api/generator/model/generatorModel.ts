export type GeneratorColumnInfo = {
  name: string;
  type: string;
  comment: string;
  length: number;
  pk: boolean;
};

export type GeneratorTableInfo = {
  name: string;
  comment: string;
  columns: GeneratorColumnInfo[];
};
