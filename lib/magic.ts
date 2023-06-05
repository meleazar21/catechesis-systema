import { MAGIC_SERVER_LINK_KEY } from "@/constants/env-variables.constants";
import { Magic } from "@magic-sdk/admin";

export const magicAdmin = new Magic(MAGIC_SERVER_LINK_KEY);