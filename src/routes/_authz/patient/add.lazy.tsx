import { createLazyFileRoute } from '@tanstack/react-router'
import AddPatient from '@pages/authz/patient/Add'

export const Route = createLazyFileRoute('/_authz/patient/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddPatient />
}
