/* eslint-disable @typescript-eslint/no-require-imports */
// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const optionsTypeCompany = [
    'Registered Company',
    'Sole Proprietorship',
    'NFT Licensor',
  ];
  const optionsTypeShoppitto = [
    'Yes, an Individual Shoppitto Account',
    'Yes, a Business Shoppitto Account',
    'Maybe later',
  ];
  const optionsTypeOfCategory = [
    {
      mainCategory: 'Objects',
      subCategory: '',
    },
    {
      mainCategory: 'Appliances',
      subCategory: '',
    },
    {
      mainCategory: 'Packaging',
      subCategory: '',
    },
    {
      mainCategory: 'General Solutions',
      subCategory: 'Individual Solutions',
    },
    {
      mainCategory: 'General Solutions',
      subCategory: 'Subscription',
    },
    {
      mainCategory: 'Licenses',
      subCategory: 'Minted NFT',
    },
    {
      mainCategory: 'Licenses',
      subCategory: 'Non-Minted NFT',
    },
    {
      mainCategory: 'Licenses',
      subCategory: 'Artwork',
    },
    {
      mainCategory: 'AI Solutions',
      subCategory: 'Individual Solutions',
    },
    {
      mainCategory: 'AI Solutions',
      subCategory: 'Subscription',
    },
  ];

  const filePathCategories = path.join(__dirname, 'categories.json');
  const jsonDataCategories = fs.readFileSync(filePathCategories, 'utf-8');
  const categories = JSON.parse(jsonDataCategories);

  const table = Object.entries(categories).map(([category, values]) => {
    //@ts-expect-error - Object entry is correct
    const rows = Object.entries(values).map(([subCategory, subValues]) => {
      if (Array.isArray(subValues)) {
        const newRows = subValues.map(value => ({
          category: category,
          subCategory: subCategory,
          item: value,
          subItem: null,
        }));

        return newRows;
      }

      if (typeof subValues === 'string') {
        return {
          category: category,
          subCategory: subCategory,
          item: null,
          subItem: null,
        };

        return;
      }

      const newRows = [];
      //@ts-expect-error - Object entry is correct
      Object.entries(subValues).map(([subSubCategory, subSubValues]) => {
        if (typeof subSubValues === 'string') {
          //@ts-expect-error - Push is correct
          newRows.push({
            category: category,
            subCategory: subCategory,
            item: subSubCategory,
            subItem: null,
          });

          return;
        }

        if (Array.isArray(subSubValues)) {
          subSubValues.map(value =>
            //@ts-expect-error - Push is correct
            newRows.push({
              category: category,
              subCategory: subCategory,
              item: subSubCategory,
              subItem: value,
            }),
          );

          return;
        }
        //@ts-expect-error - Push is correct
        if (Object.keys(subSubValues).length > 0) {
          //@ts-expect-error - Push is correct
          Object.entries(subSubValues).map(([subSubSubCategory]) => {
            //@ts-expect-error - Push is correct
            newRows.push({
              category: category,
              subCategory: subCategory,
              item: subSubCategory,
              subItem: subSubSubCategory,
            });
          });

          return;
        }
        //@ts-expect-error - Push is correct
        newRows.push({
          category: category,
          subCategory: subCategory,
          item: subSubCategory,
          subItem: null,
        });
      });

      return newRows;
    });

    return rows;
  });

  const flattenedRows = table.flat().flat();

  await prisma.typeOfBusiness.createMany({
    data: optionsTypeCompany.map(name => ({ name })),
  });

  await prisma.typeOfShoppitto.createMany({
    data: optionsTypeShoppitto.map(name => ({ name })),
  });

  await prisma.typeOfCategory.createMany({
    data: optionsTypeOfCategory.map(({ mainCategory, subCategory }) => ({
      mainCategory,
      subCategory,
    })),
  });

  const filePathCountries = path.join(__dirname, 'country-list.json');
  const jsonDataCountries = fs.readFileSync(filePathCountries, 'utf-8');
  const countries = JSON.parse(jsonDataCountries);

  await prisma.countries.createMany({
    data: countries.map(({ COUNTRY, COUNTRYCODE, ISOCODES }) => ({
      name: COUNTRY,
      countryCode: String(COUNTRYCODE),
      isoCode: ISOCODES,
      flagUrl: `https://www.countryflags.io/${COUNTRYCODE}/flat/64.png`,
    })),
  });

  await prisma.Categories.createMany({
    data: flattenedRows.map(row => ({
      category: row?.category,
      subCategory: row?.subCategory,
      item: row?.item,
      subItem: row?.subItem,
    })),
  });

  prisma.$disconnect();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
