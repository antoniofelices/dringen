import AccountDetails from '@resources/practitioner/components/AccountDetails'
import AccountResetPassword from '@resources/practitioner/components/AccountResetPassword'

const Account = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            <AccountDetails />
            <AccountResetPassword />
        </div>
    )
}

export default Account
