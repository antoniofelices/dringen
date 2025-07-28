import Logo from '@/components/base/Logo'
import MenuItems from '@/components/base/Menutems'
import main from '@/data/menus/main'
import action from '@/data/menus/action'
import user from '@/data/menus/profile'
import { Link } from '@tanstack/react-router'
import { useIsAuth } from '@/hooks/useIsAuth'

const Header = () => {
    const { isLoggedIn } = useIsAuth()

    return (
        <header
            id="header"
            className="@container/header relative container flex max-w-5xl items-center justify-between py-10"
        >
            <div className="flex">
                <div className="site-icon static z-2">
                    <Link to="/" arial-label="link to frontpage">
                        <Logo />
                    </Link>
                </div>
                <div
                    id="container-nav-header"
                    className="fixed top-0 left-0 z-1 hidden h-dvh w-dvw bg-blue-900/90 lg:static lg:block lg:h-auto lg:w-auto lg:bg-transparent lg:ml-8"
                >
                    <div className="flex h-1/2 flex-col items-center pt-[8rem] lg:h-auto lg:flex-row lg:place-content-between lg:gap-4 lg:pt-0">
                        <nav className="main-menu w-[90%] lg:w-auto">
                            <ul className="text-md flex flex-col text-center tracking-wide uppercase lg:flex-row lg:place-content-between lg:gap-7 lg:text-left lg:text-sm">
                                <MenuItems content={main} />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <ul className="text-md flex flex-col text-center tracking-wide uppercase lg:flex-row lg:place-content-between lg:gap-7 lg:text-left lg:text-sm">
                {!isLoggedIn && <MenuItems content={action} />}
                {isLoggedIn && <MenuItems content={user} />}
            </ul>
        </header>
    )
}

export default Header
