import { useId } from 'react'
import { Link } from '@tanstack/react-router'
import Button from '@components/base/Button'
import type { Form, FormErrors } from '@/types/interfaces'

const FormAuth = ({
    actionType,
    content,
    errors,
    onSubmit,
}: {
    actionType: string
    content: Form
    errors: FormErrors
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
    const confirmPasswordId = useId()
    const emailId = useId()
    const passwordId = useId()
    const userNameId = useId()

    const textButton =
        actionType === 'sign-in'
            ? content.textButtonSignIn
            : content.textButtonSignUp

    const isSignUp = actionType === 'sign-up' ? true : false

    return (
        <>
            <form className="py-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-12 lg:justify-items-start">
                    {isSignUp && (
                        <div className="relative w-full col-span-12 my-4">
                            <label htmlFor={userNameId} className="sr-only">
                                {content.labelUserName}
                            </label>
                            <input
                                type="text"
                                name="username"
                                id={userNameId}
                                className="bg-gray-100 border border-gray-500 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
                                placeholder={content.labelUserName}
                                required
                            />
                        </div>
                    )}
                    <div className="relative w-full col-span-12 my-4">
                        <label htmlFor={emailId} className="sr-only">
                            {content.labelEmail}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id={emailId}
                            className="bg-gray-100 border border-gray-500 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
                            placeholder={content.labelEmail}
                            required
                        />
                    </div>
                    <div className="relative w-full col-span-12 my-4">
                        <label htmlFor={passwordId} className="sr-only">
                            {content.labelPassword}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id={passwordId}
                            className="bg-gray-100 border border-gray-500 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
                            pattern=".{6,}"
                            placeholder={content.labelPassword}
                            required
                        />
                    </div>
                    {isSignUp && (
                        <div className="relative w-full col-span-12 my-4">
                            <label
                                htmlFor={confirmPasswordId}
                                className="sr-only"
                            >
                                {content.labelConfirmPassword}
                            </label>
                            <input
                                type="password"
                                name="confirmpassword"
                                id={confirmPasswordId}
                                pattern=".{6,}"
                                className="bg-gray-100 border border-gray-500 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
                                placeholder={content.labelConfirmPassword}
                                required
                            />
                        </div>
                    )}
                    <Button
                        type="submit"
                        classes={`w-full col-span-12 my-4`}
                        text={textButton}
                    />
                </div>
            </form>
            <div>
                {errors.noEmailPassword && (
                    <p>{content.errorNoEmailPassword}</p>
                )}
                {errors.repeatEmail && (
                    <>
                        <p>{content.errorEmailRepeat}</p>
                        <Link to={'/sign-in'}>{content.textSignIn}</Link>
                    </>
                )}
                {errors.isError && (
                    <p>
                        {content.error}: {errors.message}
                    </p>
                )}
            </div>
        </>
    )
}

export default FormAuth
