/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DisneyLogo from '../../public/disney-logo-white.png'
import MarvelLogo from '../../public/marvel-logo.png'
import NationalLogo from '../../public/national-geographic.png'
import PixarLogo from '../../public/pixar.png'
import StarWarsLogo from '../../public/star-wars-logo.png'
import styles from './home.module.scss'
import { Section } from '../components/Section'
import { NavBar } from '../components/NavBar'

export interface VideosProps {
  videos: [{
    createdAt: string,
    id: string,
    title: string,
    description: string,
    seen: boolean | null,
    slug: string,
    tags: [ string ],
    thumbnail: { url: string },
    mp4: { url: string }
  }],
  account: {
    username: string,
    avatar: { url: string },
  }
}

export default function Home( dataApi : VideosProps) {
  const [numRandom, setNumRandom] = useState(0);
  const [selectFranchise, setSelectFranchise] = useState<'familia' | 'classico' | 'pixar' | 'marvel' | 'national geographic' | 'disney' | 'star wars' | 'Recomendado para você' | ''>('');

  useEffect(() => {
    setNumRandom(Math.floor(Math.random() * dataApi.videos.length))
  },[dataApi.videos.length]);

  return (
    <>
     <NavBar username={dataApi.account.username} urlAvatar={dataApi.account.avatar.url} returnDefaultFranchises={() => setSelectFranchise('')} />
     <div>
        <div className={styles.mainVideo}>
        <Link key={dataApi.videos[numRandom].id} href={`/videos/${dataApi.videos[numRandom].slug}`}>
          <a>
            <img 
              className={styles.bannerImg}
              src={dataApi.videos[numRandom].thumbnail.url}
              alt={dataApi.videos[numRandom].title}
            />
          </a>
         </Link>
        </div>
        <div className={styles.wrapperFranchise}>
          <div className={styles.franchise} id="disney" onClick={() => setSelectFranchise('disney')}>
            <Image src={DisneyLogo} alt="Disney logo" width={488} height={204} />
          </div>
          
          <div className={styles.franchise} id="marvel" onClick={() => setSelectFranchise('marvel')}>
            <Image src={MarvelLogo} alt="Marvel logo" width={4096} height={1638} />
          </div>
          
          <div className={styles.franchise} id="natGeo" onClick={() => setSelectFranchise('national geographic')}>
            <Image src={NationalLogo} alt="National Geographic logo" width={600} height={187} />
          </div>

          <div className={styles.franchise} id="pixar" onClick={() => setSelectFranchise('pixar')}>
            <Image src={PixarLogo} alt="Pixar logo" width={1280} height={720} />
          </div>

          <div className={styles.franchise} id="starWars" onClick={() => setSelectFranchise('star wars')}>
            <Image src={StarWarsLogo} alt="Star Wars logo" width={5000} height={2191} style={{ filter: 'invert(100%)'}} />
          </div>
        </div>
        <div>
          {selectFranchise === ''
          ?
          <>
            <Section genre='Recomendado para você' CollectionVideos={dataApi} />
            <Section genre='familia' CollectionVideos={dataApi} />
            <Section genre='classico' CollectionVideos={dataApi} />
            <Section genre='disney' CollectionVideos={dataApi} />
            <Section genre='marvel' CollectionVideos={dataApi} />
            <Section genre='national geographic' CollectionVideos={dataApi} />
            <Section genre='pixar' CollectionVideos={dataApi} />
            <Section genre='star wars' CollectionVideos={dataApi} />
          </>
          :
            <Section genre={selectFranchise} CollectionVideos={dataApi} />
          }
        </div>
      
     </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.ENDPOINT as string
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN as string
    }
  })

  const videosQuery = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const accountQuery = gql`
    query {
      account(where: { id: "cl45oizie11t20blyvexbqxrn"}) {
        username,
        avatar {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos

  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

  return {
    props: {
      videos,
      account,
    }
  }
}
