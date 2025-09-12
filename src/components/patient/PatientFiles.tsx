import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import {
    uploadFiles,
    canUploadFiles,
    getPatientFiles,
} from '@services/supabaseService'
import mapSupabaseError from '@services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import type { PatientFileType } from '@/types/interfaces'
import { normalizeFileName } from '@/lib/utils'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@components/ui/base/card'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@/components/ui/FormFieldInput'
import FormFieldUpload from '@/components/ui/FormFieldUpload'
import content from '@/config/data/patient/patientFiles'

type FormData = {
    patientDni: string | null
    fileName: string
    file: File | null
}

const FormUpload = ({
    patientDni,
    onSuccess,
}: {
    patientDni: string
    onSuccess: () => void
}) => {
    const defaultValues = {
        patientDni: '',
        fileName: '',
        file: null,
    }

    const form = useForm<FormData>({
        defaultValues: defaultValues,
        mode: 'onChange',
    })

    const onSubmit = async (formData: FormData) => {
        if (!formData.file) {
            toast.error(content.textToastSelectFile)
            return
        }

        try {
            const actualFileName = `${normalizeFileName(formData.fileName)}.pdf`
            await uploadFiles(patientDni, actualFileName, formData.file)
            toast.success(content.textToastSuccess)
            onSuccess()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
            toast.error(`${content.textToastFail}: ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    control={form.control}
                    fieldName="fileName"
                    label={content.labelFileName}
                    rules={{
                        required: `${content.textRequired}`,
                        minLength: {
                            value: 1,
                            message: `${content.textMessageRequired}`,
                        },
                    }}
                />
                <FormFieldUpload
                    control={form.control}
                    fieldName="file"
                    label={content.labelFile}
                />
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

const PatientFiles = () => {
    const [canUpload, setCanUpload] = useState(false)
    const [hasFiles, setHasFiles] = useState<PatientFileType[]>([])

    const { patientData, refetchPatient } = usePatientContext()
    const patientDni = patientData?.dni ?? ''

    const checkPermissions = useCallback(async () => {
        try {
            const hasPermission = await canUploadFiles(patientDni)
            setCanUpload(hasPermission)
        } catch (error) {
            console.error(content.textConsoleErrorPermission, error)
            setCanUpload(false)
        }
    }, [patientDni])

    const loadFiles = useCallback(async () => {
        try {
            const files = await getPatientFiles(patientDni)
            setHasFiles(files)
            console.log(files)
        } catch (error) {
            console.error(content.textConsoleErrorPermission, error)
            setHasFiles([])
        }
    }, [patientDni])

    useEffect(() => {
        if (!patientDni) return
        checkPermissions()
        loadFiles()
    }, [patientDni, checkPermissions, loadFiles])

    const handleFileUploaded = useCallback(() => {
        refetchPatient()
    }, [refetchPatient])

    const filesData =
        hasFiles
            .sort((a, b) => {
                const dateA = new Date(a.file_created_at)
                const dateB = new Date(b.file_created_at)
                return dateA.getTime() - dateB.getTime()
            })
            .map((item) => {
                const date = new Date(item.file_created_at)
                    .toLocaleDateString('es-ES')
                    .slice(0, 10)
                const title = item.file_name.split('/').pop()
                return { date, title }
            }) ?? []

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {canUpload && (
                    <>
                        <h3 className="mb-4">{content.titleUpload}</h3>
                        <FormUpload
                            patientDni={patientDni}
                            onSuccess={handleFileUploaded}
                        />
                    </>
                )}
                {hasFiles.length > 0 && (
                    <>
                        <h3 className="mb-4">{content.titleListFiles}</h3>
                        <ul>
                            {filesData.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <strong>{item.date}</strong> |{' '}
                                        {item.title}
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default PatientFiles
