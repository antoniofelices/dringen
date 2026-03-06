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

export const getKey = (d: Date) => d.toISOString().split('T')[0]
