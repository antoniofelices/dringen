import { createFileRoute } from '@tanstack/react-router'
import SinglePatient from '@resources/patient/pages/SinglePatient'
import PatientProvider from '@resources/patient/context/PatientProvider'
// import ProtectedRoute from '@/components/ProtectedRoute'

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
