import type { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
    return <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
}

export default Main
