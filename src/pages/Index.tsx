import content from '@/config/data/pages/index'
import Container from '@components/base/Container'
import { useIsAuth } from '@/hooks/useIsAuth'
import { Button } from 'flowbite-react'
import { Link } from '@tanstack/react-router'
import { Modal, ModalBody, ModalFooter } from 'flowbite-react'
import { useState } from 'react'

const Index = () => {
    const { isLoggedIn } = useIsAuth()
    const [openModal, setOpenModal] = useState(false)

    return (
        <Container>
            <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            <Modal
                show={openModal}
                size="7xl"
                position="top-right"
                onClose={() => setOpenModal(false)}
                dismissible
            >
                <ModalBody className="min-h-fit">
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setOpenModal(false)}>
                        I accept
                    </Button>
                    <Button
                        color="alternative"
                        onClick={() => setOpenModal(false)}
                    >
                        Decline
                    </Button>
                </ModalFooter>
            </Modal>
            <section>
                <div className="grid max-w-screen-xl lg:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            {content.title}
                        </h1>
                        <p className="max-w-2xl my-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            {content.textIntro}
                        </p>
                        {/* {!isLoggedIn && ( */}
                        <Button size="md">
                            <Link to="/sign-in">
                                {content.textButtonSignIn}
                            </Link>
                        </Button>
                        {/* )} */}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default Index
