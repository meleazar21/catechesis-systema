import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "@/lib/magic";
import { getToken } from "@/utils/jwt.utils";
import { createNewUser, isNewUser } from "@/lib/users";
import { setTokenCookie } from "@/lib/cookies";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(400).send({ success: false, message: 'Wrong method type' });

    try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substring(7, auth.length) : "";
        const metadata = await magicAdmin.users.getMetadataByToken(didToken);
        const token = await getToken(metadata);

        const isNew = await isNewUser(metadata.issuer ?? "", token);
        isNew && await createNewUser(metadata, token);
        setTokenCookie(token, res);
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
}

export default Login;