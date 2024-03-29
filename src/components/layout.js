import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import CookieBanner from '../components/CookieBanner';

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

                <meta name="keywords" content="python, BI, sql, salesforce, data engineering, apex, soql, data analisys" />

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
                    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&family=Spectral:wght@300;600&display=swap');
                </style>

            </Head>
            <div className="no-print">

                <header className={styles.header}>
                    <div className="navbar-link centered">
                        <Link href="/" className={`${styles.devNull}`}>
                            Technical notes
                        </Link>
                        —————
                        <Link href="/cv" className={styles.devNull}>
                            CV
                        </Link>
                        —————
                        <Link href="/books" className={styles.devNull}>
                            Books & Readings
                        </Link>
                    </div>
                    <DarkModeToggle />
                </header>
            </div>

            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        ⇐ back to home
                    </Link>
                </div>
            )}
            <CookieBanner />
        </div>
    );
}