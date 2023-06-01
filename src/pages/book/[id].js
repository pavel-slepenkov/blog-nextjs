import Layout from '../../components/layout'
import Link from 'next/link'
import { getAllBookIds, getBookData } from '../../lib/book'
import { convert_tag_to_path } from '../../lib/utils'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Book({ bookData }) {
    return (
        <Layout>
            <Head>
                <title>{bookData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{bookData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={bookData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: bookData.contentHtml }} />
            </article>
            <div>
                {bookData.tag.map((tag, index) => (

                    <span className={utilStyles.tag} key={index}>
                        <Link href={`/tag/${convert_tag_to_path(tag)}`}>
                            [{tag}]
                        </Link>
                    </span>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllBookIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const bookData = await getBookData(params.id)
    return {
        props: {
            bookData
        }
    }
}