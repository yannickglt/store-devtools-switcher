export function sortObject<T>(value: T, deep: boolean = false, maxDeepLevel: number = 10, level: number = 0): T {
  return typeof value !== 'object' || value === null || Array.isArray(value)
    ? value
    : Object.keys(value)
        .sort()
        .reduce<T>(
          (res, key) => ({
            ...res,
            [key]: (deep && level < maxDeepLevel) ? sortObject(value[key], true, maxDeepLevel, level + 1) : value[key]
          }),
          {} as T
        )
}
