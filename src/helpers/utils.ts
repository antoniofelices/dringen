function filterArrayOfObjects<T>(array: T[], property: keyof T): T[] {
    return array.filter((item) => item[property])
}

const transformDate = (value: string): string => {
    const date = new Date(value)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-ES')
}

export { filterArrayOfObjects, transformDate }
