import { UsertType } from "@/enums/user-type";

export interface IUserInfo {
    id: number;
    email: string;
    issuer: string;
    publicAddress: string;
    userType: UsertType;
    fullName?: string;
    phone?: string;
    address?: string;
    birthdate?: string;
    profilePhoto?: string;
    courseId?: number;
    description?: string;
}