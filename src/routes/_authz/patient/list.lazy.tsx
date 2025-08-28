import { createLazyFileRoute } from '@tanstack/react-router'
import ListPatient from '@/pages/authz/ListPatient'

export const Route = createLazyFileRoute('/_authz/patient/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListPatient />
}
