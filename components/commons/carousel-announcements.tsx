
import React, { useState } from 'react';
import ArrowIcon from "../icons/arrow-icon";
import { ArrowType } from "@/enums/arrow-type";
import { IAnnouncements } from "@/interfaces/announcements";
import Image from "next/image";

interface ICarouselAnnouncements {
    announcements: Array<IAnnouncements>
}
export const CarouselAnnouncements = (props: ICarouselAnnouncements) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const movePrev = () => {
        if (currentIndex > 0)
            setCurrentIndex((prevState: number) => prevState - 1);
        else
            setCurrentIndex(props.announcements.length - 1);
    };

    const moveNext = () => {
        if (currentIndex < props.announcements.length - 1)
            setCurrentIndex((prevState: number) => prevState + 1);
        else
            setCurrentIndex(0);
    };

    return (
        <div className="relative m-2 w-120 flex bg-indigo flex-col items-center text-white200 rounded shadow md:flex-row md:max-w-xl hover:bg-gray-100">
            {props.announcements.map((item, index) => (
                <React.Fragment key={item.id}>
                    <Image className={`${currentIndex !== index ? "ease-in-out hidden" : ""} object-cover w-full rounded-t-lg h-96 md:w-2/4 md:rounded-none md:rounded-l-lg`} src={item.thumbnail ?? "/images/background.jpg"} alt="annoucements" width={500} height={500} />
                    <div className={`${currentIndex !== index ? "hidden" : ""} flex h-96 flex-col justify-between p-2 overflow-auto`}>
                        <h5 className="mb-1 text-xl font-bold text-white200">{item.title}</h5>
                        <p className="mb-1 font-normal text-white200">
                            {item.description}
                        </p>
                    </div>
                </React.Fragment>
            ))}
            <button disabled={props.announcements.length === 1} type="button" onClick={movePrev} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <ArrowIcon
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white-500 group-hover:bg-white dark:group-hover:bg-gray-200 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                    type={ArrowType.Previous}
                />
            </button>
            <button disabled={props.announcements.length === 1} type="button" onClick={moveNext} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <ArrowIcon
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white-500 group-hover:bg-white dark:group-hover:bg-gray-200 group-focus:ring-4 group-focus:ring-gray dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                    type={ArrowType.Next}
                />
            </button>
        </div>
    );
}