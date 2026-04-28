export const toFhirTime = (time: string) =>
    time.length === 5 ? `${time}:00` : time
