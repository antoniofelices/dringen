import { createLazyFileRoute } from '@tanstack/react-router'
import ListUsers from '@/pages/user/ListUsers'

export const Route = createLazyFileRoute('/_auth/user/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <ListUsers />
        </>
    )
}
