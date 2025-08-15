import type { PropsWithChildren } from 'react'

const MainAuthz = ({ children }: PropsWithChildren) => {
    return (
        <main className="lg:px-6 lg:py-12 w-full">
            <article className="w-full">{children}</article>
        </main>
    )
}

export default MainAuthz
