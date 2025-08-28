import { createLazyFileRoute } from '@tanstack/react-router'
import StadisticsPatient from '@/pages/authz/patient/Stadistics'

export const Route = createLazyFileRoute('/_authz/patient/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return <StadisticsPatient />
}
