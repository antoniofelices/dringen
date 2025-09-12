import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function transformDate(value: string): string {
    const date = new Date(value)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-ES')
}

export function normalizeDate(value: unknown): string | null {
    if (!value) return null
    if (typeof value === 'string') {
        return value.trim() === '' ? null : value
    }
    if (value instanceof Date && !isNaN(value.getTime())) {
        return value.toISOString().split('T')[0]
    }
    return null
}

export function transformToId(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
}

export function normalizeFileName(fileName: string): string {
    return (
        fileName
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
            .replace(/Ñ/g, 'N')
            .toLowerCase()
            .replace(/\s+/g, '-')
            // eslint-disable-next-line no-useless-escape
            .replace(/[\s\.]+/g, '-')
            .replace(/-+/g, '-')
    )
}
