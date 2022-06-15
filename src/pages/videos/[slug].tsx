/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import Link from 'next/link'

import PlayPng from '../../../public/play.png'
import GoBackPng from '../../../public/goBack.png'
import styles from './video.module.scss'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'

const changeToSeen = async(slug: string) => {
  await fetch('/api/changeToSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug })
  })
}

interface VideoProps {
  video: {
    createdAt: string,
    id: string,
    title: string,
    description: string,
    seen: null,
    slug: string,
    tags: [ string ],
    thumbnail: { url: string },
    mp4: { url: string }
  }
}

export default function Video({ video }: VideoProps) {
  const [watching, setWatching] = useState(false);
  const [videoOnPlay, setVideoOnPlay] = useState(false);

  const ref_onPlay = useRef<HTMLVideoElement>(null);

  return (
    <>
      <Head>
        <title>{video.title}</title>
      </Head>
      {!watching && 
      <>
        <img className={styles.videoImage} src={video.thumbnail.url} alt={video.title} />
        <div className={styles.shadow}></div>
        <div className={styles.wrapperGoBack}>
          <Link href="/">
            <a><Image className={styles.iconGoBack} src={GoBackPng} alt="voltar" /> </a>
          </Link>
        </div>
        <div className={styles.info}>
          <button 
            className={styles.videoOverlay}
            onClick={() => { 
              changeToSeen(video.slug)
              watching ? setWatching(false) : setWatching(true) 
            }}
          >
            <Image src={PlayPng} alt="Play" width={18} height={18} />
            <p>PLAY</p>
          </button>
          <p className={styles.infoTags}>{video.tags.join(', ')}</p>
          <p>{video.description}</p>
        </div>
      </>
      }
      {watching && (
        <div className={styles.wrapperVideo}>
          <div className={styles.wrapperIconVideoGoBack} onClick={() => watching && setWatching(false)}>
            <a><Image className={styles.iconVideoGoBack} src={GoBackPng} alt="voltar" /></a>
          </div>

          {!videoOnPlay && 
            <div className={styles.wrapperIconVideoPlay}>
              <a><Image className={styles.iconVideoPlay} src={PlayPng} alt="play" onClick={() => ref_onPlay.current?.play()} /></a>
            </div>
          }
      
          <video 
            width="100%" 
            poster={video.thumbnail.url}
            onPlay={() => setVideoOnPlay(true)}
            onPause={() => setVideoOnPlay(false)}
            controls
            ref={ref_onPlay}
          >
            <source src={video.mp4.url} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ( pageContext ) => {
  const url = process.env.ENDPOINT as string
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN as string
    }
  })
  const pageSlug = pageContext.query.slug

  const query = gql`
    query($pageSlug: String!) {
      video(where: {
        slug: $pageSlug
      }) {
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

  const variables = {
    pageSlug
  }

  const data = await graphQLClient.request(query, variables)
  const video = data.video

  return {
    props: {
      video,
    }
  }
}