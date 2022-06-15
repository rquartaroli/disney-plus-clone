/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

import logo from '../../../public/disney-plus-logo.png'

type NavBarProps = {
  username: string,
  urlAvatar: string,
  returnDefaultFranchises: () => void,
}

export function NavBar({ username, urlAvatar, returnDefaultFranchises }: NavBarProps) {
  return (
    <div className={styles.navbar}>
      <Link href='/'>
        <a onClick={returnDefaultFranchises}>
        <Image src={logo} alt="Disney Logo" width={90} height={50} />
        </a>
      </Link>
      <div className={styles.accountInfo}>
        <p>Bem vindo {username}</p>
        <img className={styles.avatar} src={urlAvatar} alt="avatar perfil" />
      </div>
    </div>
  )
}