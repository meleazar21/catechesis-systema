import { CardType } from "@/enums/card-type";
import Card from "./card";
import { CarouselAnnouncements } from "./carousel-announcements";
import { IAnnouncements } from "@/interfaces/announcements";
import { useContext } from "react";
import { StoreContext } from "@/store/store-context";
import Image from "next/image";
import PhoneIcon from "../icons/phone-icon";
import BookIcon from "../icons/book-icon";
import { UsertType } from "@/enums/user-type";

interface IHomeSection {
    announcements: Array<IAnnouncements>
}
const HomeSection = (props: IHomeSection) => {

    const { state } = useContext(StoreContext);

    console.log(state);
    return (
        <div className='flex flex-wrap w-full'>

            {state.userInfo?.userType === UsertType.catechist && (
                <Card
                    className="h-full w-60 m-2 bg-white text-black rounded shadow"
                    type={CardType.Small}
                >
                    <div className="h-1/3">
                        <Image
                            width={200}
                            height={400}
                            alt="announcement"
                            className="rounded w-full"
                            src="/images/jesus_kids.jpg"
                        />
                    </div>
                    <div className="p-2 w-full text-center">
                        <span className="mb-2 font-bold text-blue">
                            {state.userInfo?.fullName}
                        </span>
                        <p className="mb-3 font-normal text-black">{state.userInfo?.description}</p>
                    </div>
                    <ul className="p-2 text-center">
                        <li className="mb-1.5 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 group shadow">
                            <PhoneIcon className="h-5" color="red" />
                            <span className="flex-1 ml-3 whitespace-nowrap">{state.userInfo?.phone}</span>
                        </li>
                        <li className="mb-1.5 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 group shadow">
                            <BookIcon className="h-5" color="green" />
                            <span className="flex-1 ml-3 whitespace-wrap">Grupo: 8 años (comunion)</span>
                        </li>
                    </ul>
                </Card>
            )}
            <CarouselAnnouncements
                announcements={props.announcements}
            />
        </div>
    );
}
export default HomeSection;