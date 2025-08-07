import ButtonBack from '@components/base/ButtonBack'

const ListUsers = () => {
    return (
        <>
            <article>
                <div className="grid lg:grid-cols-3 gap-7 place-content-between">
                    <div className="lg:col-start-2 lg:col-end-4">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"></h1>
                    </div>
                </div>
            </article>
            <ButtonBack />
        </>
    )
}

export default ListUsers
