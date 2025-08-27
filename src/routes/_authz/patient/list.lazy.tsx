import { createLazyFileRoute } from '@tanstack/react-router'
import ListPatient from '@/pages/authz/patient/List'

export const Route = createLazyFileRoute('/_authz/patient/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListPatient />
}
