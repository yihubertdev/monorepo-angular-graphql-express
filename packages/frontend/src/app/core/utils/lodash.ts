type MapValuesToKeysIfAllowed<T> = {
  [K in keyof T]: T[K] extends PropertyKey ? K : never;
};
type Filter<T> = MapValuesToKeysIfAllowed<T>[keyof T];

/**
 * group by
 *
 * @param {T[]} arr group by array
 * @param {Key} key group by key
 * @returns {Record<T[Key], T[]> } grouped by array
 */
export function groupBy<
  T extends Record<PropertyKey, any>,
  Key extends Filter<T>
>(arr: T[], key: Key): Record<T[Key], T[]> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = val[key];
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<T[Key], T[]>);
}

/**
 * key by
 *
 * @param {T[]} arr group by array
 * @param {Key} key group by key
 * @returns {Record<T[Key], T[]> } grouped by array
 */
export function keyBy<
  T extends Record<PropertyKey, any>,
  Key extends Filter<T>
>(arr: T[], key: Key): Record<T[Key], T | null> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = val[key];
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = null;
    }
    if (accumulator[groupedKey]) {
      throw Error("duplicate value found");
    }
    accumulator[groupedKey] = val;
    return accumulator;
  }, {} as Record<T[Key], T | null>);
}
