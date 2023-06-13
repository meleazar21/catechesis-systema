import { IIcon } from "@/interfaces/icon.interface"

const PhoneIcon = (props: IIcon) => {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" fill={props.color} viewBox="0 -960 960 960">
            <path d="M795-120q-122 0-242.5-60T336-336q-96-96-156-216.5T120-795q0-19 13-32t32-13h140q14 0 24.5 9.5T343-805l27 126q2 14-.5 25.5T359-634L259-533q56 93 125.5 162T542-254l95-98q10-11 23-15.5t26-1.5l119 26q15 3 25 15t10 28v135q0 19-13 32t-32 13Z" />
        </svg>
    )
}
export default PhoneIcon