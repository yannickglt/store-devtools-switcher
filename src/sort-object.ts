export function sortObject<T>(value: T, deep: boolean = false): T {
  return typeof value !== 'object' || value === null || Array.isArray(value)
    ? value
    : Object.keys(value)
        .sort()
        .reduce<T>(
          (res, key) => ({
            ...res,
            [key]: deep ? sortObject(value[key], true) : value[key]
          }),
          {} as T
        )
}
