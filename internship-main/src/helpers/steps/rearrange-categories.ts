import { TypeOfCategory } from '@prisma/client';
import { TypeOfCategoryList } from '../interfaces';

const rearrangeCategories = (
  categories: ReadonlyArray<TypeOfCategory>,
): Array<TypeOfCategoryList> => {
  const typeOfCategoryListToUse: Array<TypeOfCategoryList> = [];

  categories.map(({ mainCategory, subCategory, valueId }) => {
    const mainCategoryIndex = typeOfCategoryListToUse.findIndex(
      ({ mainCategory: mainCategoryToUse }) =>
        mainCategoryToUse === mainCategory,
    );

    if (mainCategoryIndex === -1) {
      typeOfCategoryListToUse.push({
        id: valueId,
        mainCategory,
        children: subCategory ? [{ id: valueId, subCategory }] : [],
      });
    } else {
      typeOfCategoryListToUse[`${mainCategoryIndex}`].children.push({
        id: valueId,
        subCategory,
      });
    }
  });

  return typeOfCategoryListToUse;
};

export default rearrangeCategories;
