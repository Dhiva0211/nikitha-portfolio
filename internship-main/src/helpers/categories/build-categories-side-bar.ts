import { Categories } from '@prisma/client';

const buildTheListCategoriesSideBar = async (
  categories: ReadonlyArray<Categories>,
) => {
  const categoriesList = Object.create(null);

  categories.forEach(category => {
    const { category: cat, subCategory, item, subItem } = category;

    if (cat && !Object.prototype.hasOwnProperty.call(categoriesList, cat)) {
      categoriesList[`${cat}`] = subCategory ? Object.create(null) : cat;
    }

    if (
      cat &&
      subCategory &&
      !Object.prototype.hasOwnProperty.call(
        categoriesList[`${cat}`],
        subCategory,
      )
    ) {
      categoriesList[`${cat}`][`${subCategory}`] = item
        ? Object.create(null)
        : subCategory;
    }

    if (
      cat &&
      subCategory &&
      item &&
      !Object.prototype.hasOwnProperty.call(
        categoriesList[`${cat}`][`${subCategory}`],
        item,
      )
    ) {
      categoriesList[`${cat}`][`${subCategory}`][`${item}`] = subItem
        ? Object.create(null)
        : item;
    }

    if (
      cat &&
      subCategory &&
      item &&
      subItem &&
      !Object.prototype.hasOwnProperty.call(
        categoriesList[`${cat}`][`${subCategory}`][`${item}`],
        subItem,
      )
    ) {
      categoriesList[`${cat}`][`${subCategory}`][`${item}`][`${subItem}`] =
        subItem;
    }
  });

  return categoriesList;
};

export default buildTheListCategoriesSideBar;
