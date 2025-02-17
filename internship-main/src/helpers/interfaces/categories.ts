interface TypeOfCategoryList {
  id: string;
  mainCategory: string;
  children: Array<{ id: string; subCategory: string }>;
}

export default TypeOfCategoryList;
