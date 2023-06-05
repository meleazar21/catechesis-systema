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
}
export const magicLinkService = new MagicLinkService();