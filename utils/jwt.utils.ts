import { JWT_SECRET } from "@/constants/env-variables.constants";
import { MagicUserMetadata } from "@magic-sdk/admin";
import { IJwtPayloadCustom } from "@/interfaces/ijwt-payload-custom";
import jwt from "jsonwebtoken";

export const getToken = async (metadata: MagicUserMetadata) => {
    const token = await jwt.sign({
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 * 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": `${metadata.issuer}`,
        }
    }, JWT_SECRET);
    return token;
}

export async function verifyToken(token: string) {
    if (!token) return null;

    const { issuer } = await jwt.verify(token, JWT_SECRET) as IJwtPayloadCustom;
    return issuer;
}