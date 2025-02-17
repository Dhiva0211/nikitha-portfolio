const routesToArray = (
  obj: Record<string, unknown> | string,
): Array<string> => {
  let routesArray: Array<string> = [];

  for (const key in obj as Record<string, unknown>) {
    const value = obj[`${key}`];

    if (typeof value === 'string') {
      routesArray.push(value);
    }

    if (value && typeof value === 'object') {
      routesArray = routesArray.concat(routesToArray(value));
    }
  }

  return routesArray;
};

export default routesToArray;
