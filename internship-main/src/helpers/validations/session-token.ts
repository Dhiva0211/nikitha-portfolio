'use server';

import { BusinessInfo, BusinessLayout, Countries } from '@prisma/client';
import { redirectServerPageToLogin } from '@/helpers/api';
import { PrismaClient } from '@prisma/client';
import { linksList } from '@/helpers/steps';
import { ArrayOfPages } from '../interfaces';
import {
  buildTheDestinationAndQuery,
  routingToTheCorrectPageOfCategory,
} from '../middleware';

interface NewBusinessInfo
  extends Pick<
    BusinessInfo,
    | 'busLegalName'
    | 'address1'
    | 'city'
    | 'joinInDate'
    | 'layoutId'
    | 'taxIdNumber'
    | 'termsAndConditionFinishRegistration'
  > {
  businessLayout: Pick<
    BusinessLayout,
    'layoutId' | 'bgColor' | 'frameColor'
  > | null;
  countryInfo: Pick<Countries, 'name'>;
}

interface User {
  BusinessInfo: NewBusinessInfo | null;
}

const validateUrl = async (
  prisma: PrismaClient,
  sessionCategoryId: string,
  referer: string,
  arrayOfRoutesList: ReadonlyArray<ArrayOfPages>,
) => {
  const arrayOfCategories = await prisma.typeOfCategory
    .findMany({
      select: {
        valueId: true,
      },
    })
    .then(res => {
      if (Array.isArray(res)) {
        return res.map(item => item.valueId);
      }

      return [];
    });

  const position = arrayOfCategories.indexOf(sessionCategoryId);

  const { destination, query } = buildTheDestinationAndQuery(
    arrayOfRoutesList,
    position,
  );

  if (!referer.includes(destination)) {
    prisma.$disconnect();
    let url = destination;
    if (query) {
      const queryString = new URLSearchParams(
        query as Record<string, string>,
      ).toString();
      url += `?${queryString}`;
    }

    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  return undefined;
};

const validateCategory = async (
  prisma: PrismaClient,
  sessionCategoryId: string,
  arrayOfRoutesList: ReadonlyArray<ArrayOfPages>,
) => {
  const arrayOfCategories = await prisma.typeOfCategory
    .findMany({
      select: {
        valueId: true,
      },
    })
    .then(res => {
      if (Array.isArray(res)) {
        return res.map(item => item.valueId);
      }

      return [];
    });
  prisma.$disconnect();

  const position = arrayOfCategories.indexOf(sessionCategoryId);

  if (position !== -1)
    return routingToTheCorrectPageOfCategory(arrayOfRoutesList, position);

  return undefined;
};

const validRegistration = async (
  prisma: PrismaClient,
  sessionAccountId: string,
): Promise<
  User | { redirect: { destination: string; permanent: boolean } }
> => {
  const user = await prisma.account.findUnique({
    where: {
      userId: sessionAccountId,
    },
    select: {
      BusinessInfo: {
        select: {
          city: true,
          address1: true,
          joinInDate: true,
          busLegalName: true,
          layoutId: true,
          taxIdNumber: true,
          termsAndConditionFinishRegistration: true,
          countryInfo: {
            select: {
              name: true,
            },
          },
          businessLayout: {
            select: {
              layoutId: true,
              bgColor: true,
              frameColor: true,
            },
          },
        },
      },
    },
  });
  prisma.$disconnect();

  if (!user) return redirectServerPageToLogin();
  if (!user.BusinessInfo) {
    return {
      redirect: {
        destination: linksList[0],
        permanent: false,
      },
    };
  }

  const {
    address1,
    taxIdNumber,
    businessLayout,
    termsAndConditionFinishRegistration,
  } = user.BusinessInfo;
  const bgColor = businessLayout?.bgColor;

  if (!address1) {
    return {
      redirect: {
        destination: linksList[1],
        permanent: false,
      },
    };
  }
  if (!taxIdNumber) {
    return {
      redirect: {
        destination: linksList[2],
        permanent: false,
      },
    };
  }
  if (!bgColor) {
    return {
      redirect: {
        destination: linksList[3],
        permanent: false,
      },
    };
  }
  if (!termsAndConditionFinishRegistration) {
    return {
      redirect: {
        destination: linksList[4],
        permanent: false,
      },
    };
  }

  return user;
};

const validSessionToken = async (
  token: string | undefined,
  referer: string | undefined,
  validUser: boolean,
  validUrl?: boolean,
  validCategory?: boolean,
  arrayOfRoutesList?: ReadonlyArray<ArrayOfPages>,
): Promise<
  User | { redirect: { destination: string; permanent: boolean } } | undefined
> => {
  if (!token || !referer) return redirectServerPageToLogin();

  const prisma = new PrismaClient();
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: JSON.stringify(token),
    },
    include: {
      account: {
        select: {
          BusinessInfo: {
            select: {
              categoryId: true,
              termsAndConditionFinishRegistration: true,
            },
          },
        },
      },
    },
  });

  const isExpired =
    !session || new Date(session.expires) < new Date() || !session?.valid;
  if (isExpired) {
    prisma.$disconnect();
    return redirectServerPageToLogin();
  }
  if (!session.account.BusinessInfo?.categoryId) {
    prisma.$disconnect();
    return {
      redirect: {
        destination: linksList[0],
        permanent: false,
      },
    };
  }

  if (validUrl && !validCategory && arrayOfRoutesList?.length) {
    const result = await await validateUrl(
      prisma,
      session.account.BusinessInfo.categoryId,
      referer,
      arrayOfRoutesList,
    );

    if (result !== undefined) return result;
  }

  if (validUrl && validCategory && arrayOfRoutesList?.length) {
    return await validateCategory(
      prisma,
      session.account.BusinessInfo.categoryId,
      arrayOfRoutesList,
    );
  }

  if (validUser) {
    return await validRegistration(prisma, session.accountId);
  }

  prisma.$disconnect();
  return undefined;
};

export { validSessionToken };
