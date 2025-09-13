declare module 'react-big-calendar' {
    import { ComponentType } from 'react'

    export type View = 'month' | 'week' | 'day' | 'work_week' | 'agenda'

    export interface Event {
        id?: string | number
        title?: string
        start: Date
        end: Date
        resource?: any
    }

    export interface CalendarProps {
        localizer: any
        events?: Event[]
        startAccessor?: string | ((event: Event) => Date)
        endAccessor?: string | ((event: Event) => Date)
        views?: View[] | { [key: string]: boolean | ComponentType }
        view?: View
        onView?: (view: View) => void
        toolbar?: boolean
        [key: string]: any
    }

    export const Calendar: ComponentType<CalendarProps>
    export function dateFnsLocalizer(config: any): any
}
