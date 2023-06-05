import { verifyToken } from "@/utils/jwt.utils";

const useRedirectUser = async (context: any) => {
    const token = context.req.cookies.token as string;
    const userId = await verifyToken(token) as string;

    return { token, userId };
}
export default useRedirectUser;