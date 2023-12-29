export const infinity = 100000000; // Just a big number for rtk-query to never reload resources
export const tags = {
  USER: "USER",
  EMPLOYEE: "EMPLOYEE",
  ORGANIZATION: "ORGANIZATION",
  DOCUMENTS: "DOCUMENTS",
  BORROWER: "BORROWER",
  BORROWER_DOCUMENTS: "BORROWER_DOCUMENTS",
};

export type CacheTagsType = typeof tags;

export type CacheItem<T, Id> = { type: T; id: Id };

export type CacheList<T, Id> = (CacheItem<T, "LIST"> | CacheItem<T, Id>)[];

type InnerProvidesList<T> = <Results extends { id: unknown }[]>(
  results: Results | undefined
) => CacheList<T, Results[number]["id"]>;

export const providesList =
  <T extends string>(type: T): InnerProvidesList<T> =>
  (results) => {
    if (results) {
      return [
        { type, id: "LIST" },
        ...results.map(({ id }) => ({ type, id } as const)),
      ];
    }
    return [];
  };

export const invalidatesList =
  <T extends string>(type: T, ...ext: string[]) =>
  (): readonly [CacheItem<T, "LIST">, ...string[]] =>
    [{ type, id: "LIST" }, ...ext] as const;

export const cacheByIdArg =
  <T extends string>(type: T) =>
  <Id, Result = undefined, Error = undefined>(
    result: Result,
    error: Error,
    id: Id
  ): readonly [CacheItem<T, Id>] =>
    [{ type, id }] as const;

/**
 * HOF to create an entity cache for a single item using the id property from the query argument as the Id.
 *
 * @example
 * 
ts
 * cacheByIdArgProperty('Todo')(undefined, { id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * 
 */
export const cacheByIdArgProperty =
  <T extends string>(type: T, ...ext: string[]) =>
  <Arg extends { id: unknown }, Result = undefined, Error = undefined>(
    result: Result,
    error: Error,
    arg: Arg
  ): readonly [CacheItem<T, Arg["id"]>, ...string[]] | [] =>
    [{ type, id: arg.id }, ...ext] as const;

export const cacher = {
  tags,
  providesList,
  invalidatesList,
  cacheByIdArg,
  cacheByIdArgProperty,
};
