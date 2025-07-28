import MenuItems from '@/components/base/Menutems'
import healthConsumers from '@/data/menus/healthConsumers'
import users from '@data/menus/users'
import { Link } from '@tanstack/react-router'

const Aside = () => {
    return (
        <>
            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full border-r border-gray-200 md:translate-x-0 dark:border-gray-700"
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full">
                    {/* <button
                        type="button"
                        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                        <svg
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                        </svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            Home
                        </span>
                    </button> */}
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
