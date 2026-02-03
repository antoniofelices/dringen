import { createLazyFileRoute } from '@tanstack/react-router'
import StatisticsPatient from '@resources/patient/pages/Statistics'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/statistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return <StatisticsPatient />
}
