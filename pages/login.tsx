import Head from "next/head";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import { isValidEmail } from "@/utils/email.util";
import { magicLinkService } from "@/services/magic-link.service";
import { useRouter } from "next/router";
import { Paths } from "@/constants/paths";
import { NextApiRequest } from "next";
import useRedirectUser from "@/hooks/redirect-user";
import LoadingIcon from "@/components/icons/loading-icon";
import { StoreContext } from "@/store/store-context";
import { ActionTypes } from "@/state/action-types";
import { IUserInfo } from "@/interfaces/user-info";

interface IContext {
    req: NextApiRequest;
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [userMsg, setUserMsg] = useState<string>("");
    const router = useRouter();
    const { dispatch } = useContext(StoreContext);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleLoginWithEmail();
    }

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        if (!isValidEmail(value))
            setUserMsg("Invalid email!");
        else
            setUserMsg("");
        setEmail(value);
    }

    const handleLoginWithEmail = async () => {
        if (!email.trim()) return setUserMsg("Please enter a valid email");

        setLoading(true);
        const idToken = await magicLinkService.loginUser(email);
        if (!idToken) {
            setUserMsg("Error trying to login: " + idToken);
        } else {
            const request = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'authorization': `Bearer ${idToken}`,
                    'content-type': 'application/json'
                }
            });
            const response = await request.json();
            console.log({ response });
            if (response.success) {
                const newUserInfo = { ...response.userInfo } as IUserInfo;
                dispatch({
                    type: ActionTypes.SET_USER_INFO,
                    payload: newUserInfo
                });
                router.push(Paths.Home);
            }
            else {
                setUserMsg("Something went wrong while trying to login");
                setLoading(false);
            }

        }
    }

    const disableLoginBtn = () => {
        return (loading || userMsg.length > 0);
    }

    useEffect(() => {
        const handleComplete = () => {
            setLoading(false);
        }
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
        return () => {
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [])

    return (
        <div className={styles.container} >
            <Head>
                <title>Inicio de Sesión</title>
                <meta name="description" content="inicio de sesion catequesis el calvario masaya" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h2 className={styles.signinHeader}>Iniciar Sesión</h2>
                    <input
                        className={styles.emailInput}
                        disabled={loading}
                        type="text"
                        placeholder="correo electronico"
                        onChange={handleChange}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    <button disabled={disableLoginBtn()} className={styles.loginBtn} onClick={handleLoginWithEmail}>
                        {loading && (
                            <>
                                <LoadingIcon width={1} heigh={1} />
                                Iniciando...
                            </>
                        )}
                        {!loading && "Iniciar"}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login;