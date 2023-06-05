import { MAGIC_LINK_KEY } from "@/constants/env-variables.constants";
import { Magic } from "magic-sdk";

export const magicAdmin = new Magic(MAGIC_LINK_KEY);