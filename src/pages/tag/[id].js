import Layout from '../../components/layout'
import Link from 'next/link'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { getAllTags } from '../../lib/tag'
import { convert_tag_to_path } from '../../lib/utils'

const allTags = getAllTags();

export async function getStaticProps({ params }) {
    const tagData = {
        id: params.id,
        posts: allTags[params.id]
    };
    return {
        props: {
            tagData
        }
    }
}

export async function getStaticPaths() {
    const paths = Object.keys(allTags).map(fileName => {
        return {
            params: {
                id: convert_tag_to_path(fileName)
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export default function Tag({ tagData }) {
    return (
        <Layout>
            <Head>
                <title>{tagData.id}</title>
            </Head>

            <h2 className={utilStyles.headingLg}>
                {tagData.id}
            </h2>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <ul className={utilStyles.list}>
                    { tagData.posts.map(({ postId, title, date}) => (
                        <li className={utilStyles.listItem} key={postId}>
                            ※ <Link href={`/posts/${postId}`}>
                                {title}
                            </Link>
                            {/* <br /> */}
                            <small className={utilStyles.tagPageDate}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
