import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const name = '$ /dev/null'
export const siteTitle = 'Pavel Slepenkov\'s personal blog'
export const shortDescription = 'stories about BI, python, salesforce and data analysis'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link href={`https://unpkg.com/prismjs@1.23.0/themes/prism-okaidia.css`} rel="stylesheet" />

                <meta charset="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <meta name="description" content={`${siteTitle}: ${shortDescription}`}/>

                <meta http-equiv="cache-control" content="Private" />
                <meta http-equiv="Expires" content="366000" />

                <meta property="og:locale" content="en_US" />
                <meta name="og:title" content={siteTitle} />

                <meta property="og:description" content={shortDescription} />
                <meta property='og:type' content="article" />
                <meta property='og:site_name' content="pavelslepenkov.info" />
                <meta property="og:image" content="/og.png" />

                <meta name="twitter:title" content="Pavel Slepenkov's personal blog" />
                <meta name="twitter:description" content={shortDescription} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="/og.png" />

                <meta name="keywords" content="python, BI, salesforce, data engineering, apex, sql, soql, data analisys" />

                <meta name="yandex-verification" content="35a3887ea995a4c4" />

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
                    <Link href="/about">
                        <a className={`${styles.devNull}`}>About </a>
                    </Link>———
                    <a className={styles.devNull} href="https://pavel-slepenkov.github.io">Projects</a>
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
