import Loader from '@/components/commons/loader';
import { Paths } from '@/constants/paths';
import useRedirectUser from '@/hooks/redirect-user';
import { IUserInfo } from '@/interfaces/user-info';
import { magicLinkService } from '@/services/magic-link.service';
import { userService } from '@/services/user.service';
import { ActionTypes } from '@/state/action-types';
import { storeReducer } from '@/state/reducers';
import { StoreContext, initialState } from '@/store/store-context';
import '@/styles/globals.css'
import { NextApiRequest } from 'next';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useContext, useEffect, useReducer, useState } from 'react';

interface IContext {
  req: NextApiRequest;
}

const getServerSideProps = async (context: IContext) => {
  const { userId } = await useRedirectUser(context);

  if (!userId) {
    return {
      redirect: {
        destination: Paths.Login,
        permanent: false,
      }
    }
  }
  return { props: {} };
}

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadUserData = async () => {
    let userInfo: IUserInfo;
    const userData = localStorage.getItem("userInfo") ?? "";
    if (Object.keys(userData).length) {
      userInfo = JSON.parse(userData) as IUserInfo;
    }
    else {
      const magicToken = localStorage.getItem("magicToken");
      if (!magicToken) return;
      const response = await userService.login(magicToken);
      userInfo = { ...response.userInfo } as IUserInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

    }
    dispatch({
      type: ActionTypes.SET_USER_INFO,
      payload: userInfo
    });
  }

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setLoading(true);
      const isLoggedIn = await magicLinkService.isUserLogin();
      if (isLoggedIn) {
        const token = document.cookie.substring(6, document.cookie.length);
        await loadUserData();
        router.push(Paths.Home);
      }
      else router.push(Paths.Login);
    }

    checkIsLoggedIn();

    const handleComplete = () => {
      setLoading(false);
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <StoreContext.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      )}
    </>
  )
}