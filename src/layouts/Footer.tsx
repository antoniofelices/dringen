import Logo from '@/components/base/Logo'
import Container from '@/components/base/Container'
import { Link } from '@tanstack/react-router'

const Footer = () => {
    const date = new Date()
    const [year] = [date.getFullYear()]

    return (
        <footer id="footer" className="@container/footer py-30">
            <Container>
                <div className="grid lg:grid-cols-2 gap-7 place-content-between">
                    <div className="site-icon ">
                        <Link to="/" arial-label="link to frontpage">
                            <Logo />
                        </Link>
                    </div>
                    <p className="lg:justify-self-end text-sm">
                        © {year} Lorem. All Rights Reserved.
                    </p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
