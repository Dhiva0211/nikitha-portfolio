import { ArrayOfPages } from '../interfaces';

const buildTheDestinationAndQuery = (
  arrayOfPages: ReadonlyArray<ArrayOfPages>,
  position: number,
) => {
  const pagesLinkArray: Array<{
    link: string;
    query: { [key: string]: unknown } | null;
  }> = [];

  arrayOfPages.map(page => {
    if (page.children.length > 0) {
      page.children.map(child => {
        pagesLinkArray.push({
          link: child.link ?? '',
          query: child.query,
        });
      });
    }

    if (page.link === null) return;
    pagesLinkArray.push({
      link: page.link,
      query: page.query,
    });
  });

  const destination = pagesLinkArray[`${position}`].link;
  const query = pagesLinkArray[`${position}`].query;

  return { destination, query };
};

const routingToTheCorrectPageOfCategory = (
  arrayOfPages: ReadonlyArray<ArrayOfPages>,
  position: number,
) => {
  const { destination, query } = buildTheDestinationAndQuery(
    arrayOfPages,
    position,
  );

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
};

export default routingToTheCorrectPageOfCategory;
export { buildTheDestinationAndQuery };
