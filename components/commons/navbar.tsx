import Image from "next/image";
import DrawerIcon from "../icons/drawer-icon";
import { useContext } from "react";
import { StoreContext } from "@/store/store-context";
import { ActionTypes } from "@/state/action-types";
import BellIcon from "../icons/bell-icon";

const NavBar = () => {

    const { state, dispatch } = useContext(StoreContext);

    const handleDisplayDrawer = () => {
        dispatch({
            type: ActionTypes.DISPLAY_DRAWER,
            payload: !state.isDrawerOpen
        });
    }
    return (
        <>
            <div className="antialiased">
                <nav className="bg-dark text-white border-b border-gray-200 px-4 py-2 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex justify-start items-center">
                            <button onClick={handleDisplayDrawer} className="p-2 mr-2 text-white rounded-lg cursor-pointer hover:bg-white">
                                <DrawerIcon color="white" />
                            </button>
                            <div className="bg-white flex items-center justify-between mr-4">
                                <Image
                                    className="mr-3"
                                    src="/images/logo.png"
                                    alt="catequesis_logo"
                                    width={40}
                                    height={40}
                                />
                                <span className="self-center text-white200 text-white text-2xl font-semibold whitespace-nowrap">
                                    Catequesis Calvario
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center lg:order-2">
                            {/* Notifications */}
                            <button type="button" data-dropdown-toggle="notification-dropdown" className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <span className="sr-only text-white">View notifications</span>
                                {/* Bell icon */}
                                <BellIcon color="white" />
                            </button>
                            <div className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png" alt="user photo" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
}
export default NavBar;