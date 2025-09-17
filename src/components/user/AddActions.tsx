import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useDialog } from '@hooks/useDialog'
import { deleteUser, resetPassword } from '@/services/supabaseAdmin'
import { Button } from '@/components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/base/dialog'
import content from '@/config/data/user/addActions'

const AddActions = ({
    userId,
    userEmail,
}: {
    userId: string
    userEmail: string
}) => {
    const navigate = useNavigate()
    const deleteUserDialog = useDialog()

    const handleResetPassword = async () => {
        try {
            const result = await resetPassword(userEmail)
            if (result.error) {
                toast.error(
                    result.error.message || content.textToastFailResetPassword
                )
            } else {
                toast.success(content.textToastSuccessResetPassword)
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : content.textToastFailResetPassword
            toast.error(errorMessage)
        }
    }

    const handleDelete = async () => {
        try {
            const result = await deleteUser(userId)
            if (result.error) {
                toast.error(
                    result.error.message || content.textToastFailDeleteUser
                )
            } else {
                toast.success(content.textToastSuccessDeleteUser)
                navigate({ to: '/user/list' })
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : content.textToastFailDeleteUser
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>
                        <h2 className="mb-8">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li className="lg:flex justify-between my-4">
                            {content.textResetPassword}
                            <Button size="xs" onClick={handleResetPassword}>
                                {content.textButtonResetPassword}
                            </Button>
                        </li>
                        <li className="lg:flex justify-between my-4">
                            {content.textDeleteAccount}
                            <Button
                                size="xs"
                                variant="destructive"
                                onClick={() => deleteUserDialog.openDialog()}
                            >
                                {content.textButtonDeleteAccount}
                            </Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Dialog
                open={deleteUserDialog.isOpen}
                onOpenChange={deleteUserDialog.setIsOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content.titleDialog}</DialogTitle>
                        <DialogDescription>
                            {content.textDescriptionDialog}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                {content.textButtonCancelDialog}
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            {content.textButtonDeleteAccount}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddActions
