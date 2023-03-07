import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
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
                <div className="no-print">
                    <div className="centered">
                        <h1 className={utilStyles.headingLg}>{/* ?> */}</h1>
                        <br/>
                        <img src="/images/pvl2021.png" className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} />
                        <h1 className={utilStyles.headingLg}/>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
                <table className={cvStyles.layout}>
                    <tbody>
                        <tr>
                            <td className={cvStyles.cvWorkExperience}>
                                <div dangerouslySetInnerHTML={{ __html: workExp.contentHtml }} />
                            </td>
                            <td className={cvStyles.cvSkillsSection}>
                                <div dangerouslySetInnerHTML={{ __html: skills.contentHtml }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.tableau }} />
                </div>
            </section>
        </Layout>
    )
}
