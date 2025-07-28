function filterArrayOfObjects<T>(array: T[], property: keyof T): T[] {
    return array.filter((item) => item[property])
}

export { filterArrayOfObjects }
