/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

type CardProps = {
  urlThumbnail: string
  altTitle: string
}

export function Card({ urlThumbnail, altTitle }: CardProps) {
  return (
    <img className={styles.card} src={urlThumbnail} alt={altTitle} />
  )
}