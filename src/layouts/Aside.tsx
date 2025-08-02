import MenuItems from '@/components/base/Menutems'
import healthConsumers from '@/config/data/menus/healthConsumers'
import users from '@/config/data/menus/users'
import { Link } from '@tanstack/react-router'

const Aside = () => {
    return (
        <>
            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full border-r border-gray-300 md:translate-x-0 dark:border-gray-700"
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full">
                    <Link to="/">Home</Link>
                    <div className="py-4">
                        <h2 className="text-xs mb-1 text-gray-500">
                            Health Consumers
                        </h2>
                        <ul className="space-y-2 list-outside">
                            <MenuItems content={healthConsumers} />
                        </ul>
                    </div>
                    <div className="py-4">
                        <h2 className="text-xs mb-1 text-gray-500">Users</h2>
                        <ul className="space-y-2">
                            <MenuItems content={users} />
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Aside
