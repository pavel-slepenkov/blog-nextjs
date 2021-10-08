import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import { getPageByName } from '../lib/pages'
import styles from '../components/layout.module.css'
import cvStyles from '../styles/cv.module.css'

export async function getStaticProps() {
    const pageData = await getPageByName('cv');
    const skills = await getPageByName('skills');
    const workExp = await getPageByName('work_exp');
    return {
        props: {
            pageData,
            skills,
            workExp
        }
    }
}

export default function Home({ pageData, skills, workExp }) {
    return (
        <Layout home>
            <Head>
                <title>Pavel Slepiankou CV</title>
            </Head>

            <section className={utilStyles.headingMd} />

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <div class="no-print">
                    <div className="centered">
                        <h1 className={utilStyles.headingLg}>{/* ?> */}</h1>
                        <br/>
                        <img src="/images/pvl2021.png" className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} />
                        <h1 className={utilStyles.headingLg}/>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
                <table className={cvStyles.layout}>
                    <tr>
                        <td>
                            <div dangerouslySetInnerHTML={{ __html: workExp.contentHtml }} />
                        </td>
                        <td class="right-pinned">
                            <div dangerouslySetInnerHTML={{ __html: skills.contentHtml }} />
                        </td>
                    </tr>
                </table>
                {/* <div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.tableau }} />
                </div> */}
            </section>
        </Layout>
    )
}
