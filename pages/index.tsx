import Head from 'next/head'
import NavBar from '@/components/commons/navbar'
import Drawer from '@/components/commons/drawer'
import { useContext } from 'react'
import { StoreContext } from '@/store/store-context'
import HomeSection from '@/components/commons/home-section';
import { GetServerSideProps, NextApiRequest } from "next";
import useRedirectUser from "@/hooks/redirect-user";
import { Paths } from "@/constants/paths";
import { announcementService } from "@/services/announcement.service";
import { IAnnouncements } from "@/interfaces/announcements";

interface IContext {
  req: NextApiRequest;
}
export async function getServerSideProps(context: IContext) {
  const { userId, token } = await useRedirectUser(context);

  if (!userId) {
    return {
      redirect: {
        destination: Paths.Login,
        permanent: false
      }
    }
  }
  const announcements = await announcementService.getAnnouncements(token);
  return {
    props: {
      announcements
    }
  }
}
interface IServerSideProps {
  announcements: Array<IAnnouncements>
}
export default function Home(props: IServerSideProps) {
  const { state } = useContext(StoreContext);
  const { isDrawerOpen } = state;
  return (
    <div>
      <Head>
        <meta name="description" content="Inscripciones catequesis parroquia el calvario masaya nicaragua" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Drawer />
      <section className={`p-4 mt-20 ${isDrawerOpen ? "translate-x-1/4" : ""}`}>
        <HomeSection announcements={props.announcements} />
      </section>
    </div>
  )
}
