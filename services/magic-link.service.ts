import { magic } from "@/lib/magic-client";

class MagicLinkService {
    async loginUser(email: string) {
        try {
            if (!magic) return "";
            const idToken = await magic.auth.loginWithMagicLink({ email });
            return idToken;
        } catch (error) {
            console.log("error trying to auth: " + error);
            return "";
        }
    }
    isUserLogin = async () => {
        try {
            if (magic) {
                const isLoggedIn = await magic.user.isLoggedIn();
                return isLoggedIn;
            }
        } catch (error) {
            console.log("Error trying to check if user is logged In: ", error);
            return false;
        }
    }
}
export const magicLinkService = new MagicLinkService();