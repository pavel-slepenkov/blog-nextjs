import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import { getPageByName } from '../lib/pages'
import styles from '../components/layout.module.css'

export async function getStaticProps() {
    const pageData = await getPageByName('about')
    return {
        props: {
            pageData
        }
    }
}

export default function Home({ pageData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={utilStyles.headingMd}>

            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

                <div className="centered">

                    <h1 className={utilStyles.headingLg}>
                    {/* ?> */}
                    </h1>

                    <br/>

                    <img src="/images/pvl2021.png" className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} />

                    <h1 className={utilStyles.headingLg}>

                    </h1>
                </div>

                <div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
                </div>

                {/* <div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.tableau }} />
                </div> */}


            </section>
        </Layout>
    )
}
