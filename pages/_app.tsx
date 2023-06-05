import Loader from '@/components/commons/loader';
import { Paths } from '@/constants/paths';
import useRedirectUser from '@/hooks/redirect-user';
import '@/styles/globals.css'
import { NextApiRequest } from 'next';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setLoading(true);
      const isLoggedIn = false;
      console.log({ isLoggedIn });
      if (isLoggedIn) router.push(Paths.Home);
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
      {!loading && <Component {...pageProps} />}
    </>
  )
}
