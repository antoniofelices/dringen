import type { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
    return <main className="lg:px-6 lg:py-12">{children}</main>
}

export default Main
