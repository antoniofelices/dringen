import type { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
    return <div className="container max-w-5xl py-11">{children}</div>
}

export default Container
