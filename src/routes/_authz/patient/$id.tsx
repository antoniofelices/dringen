import { createFileRoute } from '@tanstack/react-router'
import SinglePatient from '@/pages/authz/SinglePatient'
import PatientProvider from '@/context/PatientProvider'

export const Route = createFileRoute('/_authz/patient/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: params.id,
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()

    return (
        <PatientProvider patientId={id}>
            <SinglePatient />
        </PatientProvider>
    )
}
