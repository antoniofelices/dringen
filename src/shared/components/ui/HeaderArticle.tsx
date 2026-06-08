import type { PropsWithChildren } from 'react'

const HeaderArticle = ({
    title,
    children,
}: PropsWithChildren<{ title: string }>) => {
    return (
        <header className="p-4 lg:px-6 bg-sidebar border-b border-sidebar-border">
            <div className="flex justify-between items-center">
                <h1 className="font-extrabold">{title}</h1>
                {children}
            </div>
        </header>
    )
}

export default HeaderArticle
