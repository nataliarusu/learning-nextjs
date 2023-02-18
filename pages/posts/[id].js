import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

//for staticly generate dynamic id we should have getStaticPaths() which returns an array of all possible values of id
export async function getStaticPaths() {
  const paths = getAllPostIds(); // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

  return {
    paths,
    fallback: false,
  };
}

//getPostData returns {param:{}}
// getStaicProps() which fetches necessary data for the post with id
export async function getStaticProps({ params }) {
  console.log(params, " params"); //{ id: 'ssg-ssr' }
  const postData = await getPostData(params.id);
  console.log(postData.contentHtml, " contentHtml");
  return {
    props: {
      postData,
    },
  };
}

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
    </Layout>
  );
}
