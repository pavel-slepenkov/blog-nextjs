import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const name = '$ /dev/null'
export const siteTitle = 'Pavel Slepenkov\'s personal blog'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>

            <Head>
                <link rel="icon" href="/favicon.ico" />

                <link
                    href={`https://unpkg.com/prismjs@1.23.0/themes/prism-okaidia.css`}
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Pavel Slepenkov - developer"
                />
                <meta
                    property="og:image"
                    content="/og.png"
                />

                <meta http-equiv="cache-control" content="Private" />
                <meta http-equiv="Expires" content="366000" />

                <meta name="og:title" content={siteTitle} />
                <meta property='og:type' content="article" />
                <meta property='og:site_name' content="pavelslepenkov.info" />
                <meta name="twitter:card" content="summary_large_image" />

                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-63037633-1"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-63037633-1');
                    `}}
                />
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&family=Spectral:wght@300&display=swap');
                </style>

            </Head>
            <header className={styles.header}>

                <div className="navbar-link">

                    <Link href="/">
                        <a className={`${styles.devNull}`}>{name}</a>
                    </Link>———

                    <a styleClass={styles.devNull} href="https://pavel-slepenkov.github.io">About </a>———
                    <a styleClass={styles.devNull} href="https://pavel-slepenkov.github.io">Projects</a>
                    {/* <a styleClass={styles.devNull} href="https://pavel-slepenkov.github.io">In Russian</a> */}

                </div>
                <DarkModeToggle />
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>⇐ back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}