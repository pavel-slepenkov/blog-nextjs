import Layout from '../../components/layout'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { convert_tag_to_path } from '../../lib/utils'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            <div>
                {postData.tag.map((tag) => (
                    <span className={utilStyles.tag} >
                        <Link href={`/tag/${convert_tag_to_path(tag)}`}>
                            <a>[{tag}]</a>
                        </Link>
                    </span>
                ))}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
