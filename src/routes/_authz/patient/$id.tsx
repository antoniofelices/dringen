import { createFileRoute } from '@tanstack/react-router'
import SinglePatient from '@/pages/patient/SinglePatient'
import PatientProvider from '@/context/PatientProvider'
import ProtectedRoute from '@/components/ProtectedRoute'

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
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <PatientProvider patientId={id}>
                <SinglePatient />
            </PatientProvider>
        </ProtectedRoute>
    )
}
