import type { PropsWithChildren } from 'react'

const HeaderArticle = ({
    title,
    children,
}: PropsWithChildren<{ title: string }>) => {
    return (
        <header className="p-4 lg:px-6 bg-sidebar border-b-2 border-b-gray-200 dark:border-b-gray-800">
            <div className="flex justify-between items-center">
                <h1 className="font-extrabold">{title}</h1>
                {children}
            </div>
        </header>
    )
}

export default HeaderArticle
