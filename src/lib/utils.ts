import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function filterArrayOfObjects<T>(array: T[], property: keyof T): T[] {
    return array.filter((item) => item[property])
}

export function transformDate(value: string): string {
    const date = new Date(value)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-ES')
}
