import { useContext } from "react";
import CloseIcon from "../icons/close-icon";
import { StoreContext } from "@/store/store-context";
import { ActionTypes } from "@/state/action-types";

const Drawer = () => {
    const { dispatch, state } = useContext(StoreContext);
    const { isDrawerOpen } = state;

    const handleClickDrawer = () => {
        dispatch({
            type: ActionTypes.DISPLAY_DRAWER,
            payload: !isDrawerOpen,
        });
    }

    return (
        <>
            <div className={`bg-black200 top-0 mt-24 left-0 w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 md:mt-14 lg:mt-14 xl:mt-14 p-2 sm:p-6 md:p-s6 lg:p-6 xl:pd-6 text-white fixed h-full z-40 transition-transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`} tabIndex={-1}>
                <button onClick={handleClickDrawer} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <CloseIcon color="white" />
                    <span className="sr-only text-white200">Close menu</span>
                </button>
            </div>
        </>
    );
}
export default Drawer;