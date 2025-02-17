interface ArrayOfPages {
  title: string;
  link: string | null;
  query: { [key: string]: boolean | undefined } | null;
  children: ReadonlyArray<Omit<ArrayOfPages, 'children'>>;
}

export type { ArrayOfPages };
