import { IIcon } from "@/interfaces/icon.interface";

const BookIcon = (props: IIcon) => {
    return (
        <svg className={props.className} fill={props.color} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" >
            <path d="M343-420h225v-60H343v60Zm0-90h395v-60H343v60Zm0-90h395v-60H343v60Zm-83 400q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Z" />
        </svg>
    )
}
export default BookIcon;