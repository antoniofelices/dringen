import AccountDetails from '@components/settings/AccountDetails'
import AccountResetPassword from '@components/settings/AccountResetPassword'

const Account = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            <AccountDetails />
            <AccountResetPassword />
        </div>
    )
}

export default Account
