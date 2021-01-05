import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react';

const name = 'Pavel Slepenkov'
export const siteTitle = 'Pavel Slepenkov personal blog'

export default function Layout({ children, home }) {
    const [theme, setTheme] = useState('okaidia');

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
                    as="script"
                />
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
                    as="script"
                />
                <link
                    href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`}
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Pavel Slepenkov - developer"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg&widths=auto`}
                />
                <meta name="og:title" content={siteTitle} />
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

            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img
                            src="images/sh.jpg"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src="/images/sh.jpg"
                                        className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2 className={utilStyles.headingLg}>
                                <Link href="/">
                                    <a className={utilStyles.colorInherit}>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
