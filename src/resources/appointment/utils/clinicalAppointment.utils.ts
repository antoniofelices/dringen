export function addDays(date: Date, n: number): Date {
    const d = new Date(date)
    d.setDate(d.getDate() + n)
    return d
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

export const getKey = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}

export const byStart = (a: { start: string }, b: { start: string }) =>
    a.start < b.start ? -1 : a.start > b.start ? 1 : 0

export const byStartDesc = (a: { start: string }, b: { start: string }) =>
    a.start > b.start ? -1 : a.start < b.start ? 1 : 0
