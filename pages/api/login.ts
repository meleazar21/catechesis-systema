import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "@/lib/magic";
import { getToken } from "@/utils/jwt.utils";
import { createNewUser, getUserByIssuer } from "@/lib/users";
import { setTokenCookie } from "@/lib/cookies";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(400).send({ success: false, message: 'Wrong method type' });

    try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substring(7, auth.length) : "";
        const metadata = await magicAdmin.users.getMetadataByToken(didToken);
        const token = await getToken(metadata);

        let response = await getUserByIssuer(metadata.issuer ?? "", token);
        const isNewUser = response?.user?.length === undefined;
        setTokenCookie(token, res);
        if (isNewUser) {
            let insertedUser = await createNewUser(metadata, token);
            res.send({ success: true, userInfo: insertedUser.data.insert_user.returning[0] });
        } else {
            res.send({ success: true, userInfo: response?.user[0] });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
}

export default Login;