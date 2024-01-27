import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { convert_tag_to_path } from '../lib/utils'
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <h2 className={utilStyles.headingLg}>
          <b>[</b> Blog <b>]</b>
        </h2>

        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tag }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                ↠ {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
                {tag.map((t) => (
                  <span className={utilStyles.tag} key={t} >
                    <Link href={`/tag/${convert_tag_to_path(t)}`}>
                      [{t}]
                    </Link>
                  </span>
                  ))}
              </small>
            </li>

          ))}
        </ul>
      </section>
    </Layout>
  );
}
