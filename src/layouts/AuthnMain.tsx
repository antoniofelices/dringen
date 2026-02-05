import type { PropsWithChildren } from 'react'

const MainAuthn = ({ children }: PropsWithChildren) => {
    return (
        <main className="grid min-h-screen place-items-center">
            <div className="w-full max-w-md mx-auto p-4">{children}</div>
        </main>
    )
}

export default MainAuthn
