import Link from "next/link"
import { VideosProps } from "../../pages"
import { Card } from "../Card"
import styles from './styles.module.scss'

type SectionProps = {
  genre: 'familia' | 'classico' | 'pixar' | 'marvel' | 'national geographic' | 'disney' | 'star wars' | 'Recomendado para você' | ''
  CollectionVideos: VideosProps
}

export function Section({ genre, CollectionVideos }:SectionProps) {
  
  const videoSelectedByGenre = genre === 'Recomendado para você' 
  ? CollectionVideos.videos.filter((video) => video.seen === false || video.seen === null)
  : CollectionVideos.videos.filter((video) => video.tags.includes(genre))
  
  return (
    videoSelectedByGenre.length > 0 ?
    <div className={styles.section}>
      <h3 style={{ marginLeft: 5 }}>{genre.toUpperCase()}</h3>
      <div>
        {videoSelectedByGenre.map(video => (
          <div key={video.id} className={styles.wrapperCard}>
            <Link  href={`/videos/${video.slug}`}>
              <a>
                <Card urlThumbnail={video.thumbnail.url} altTitle={video.title} />
              </a>
            </Link>
          </div>
        ))}
        {videoSelectedByGenre.length === 1
        && 
        videoSelectedByGenre.map(video => (
          <div key={video.id} className={styles.wrapperCardFake}>
            <Link  href={`/videos/${video.slug}`}>
              <a>
                <Card urlThumbnail={video.thumbnail.url} altTitle={video.title} />
              </a>
            </Link>
          </div>
        ))
        }
      </div>
    </div>
    :
    <></>
  )
}