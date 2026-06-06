import type { PropsWithChildren } from 'react'

const ContentArticle = ({ children }: PropsWithChildren) => {
    return <div className="p-4 xl:p-6 lg:max-w-6xl">{children}</div>
}

export default ContentArticle
