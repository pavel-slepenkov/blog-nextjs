import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedBooksData } from '../lib/book'
import { convert_tag_to_path } from '../lib/utils'
import Date from '../components/date'

export async function getStaticProps() {
  const allBooksData = getSortedBooksData()
  return {
    props: {
      allBooksData
    }
  }
}

export default function Home({ allBooksData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        I make sporadic and a bit chaotic reviews of books, movies, articles which got in my hands.
        You could find more in <Link href="https://www.goodreads.com/user/show/22682554-pavel">Goodreads</Link>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <h2 className={utilStyles.headingLg}>
          <b>❲ ... random reviews ... ❳</b>
        </h2>

        <div className={utilStyles.wrapper}>
          {allBooksData.map(({ id, date, title, tag }) => (

            <div className={utilStyles.card} key={id}>

              <Link href={`/book/${id}`}>
                {title}
              </Link>
              <br />
              <div className={utilStyles.bottomPined}>
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
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
