import type { PropsWithChildren } from 'react'

const AuthzMain = ({ children }: PropsWithChildren) => {
    return (
        <main className="w-full">
            <article className="w-full relative">{children}</article>
        </main>
    )
}

export default AuthzMain
