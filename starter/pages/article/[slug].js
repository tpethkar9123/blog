import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"

const Article = ({ article, categories }) => {
  if (!article) return null;

  const imageUrl = getStrapiMedia(article.cover || article.image)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.cover || article.image,
    article: true,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      >
        <h1>{article.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.content} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author?.picture && (
                <NextImage image={article.author.picture} />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.author?.name || 'Anonymous'}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.publishedAt || article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticPaths() {
  const articles = await fetchAPI("/articles")

  return {
    paths: (articles || []).map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}


export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?filters[slug][$eq]=${params.slug}&populate=*`)
  const categories = await fetchAPI("/categories?populate=*")

  return {
    props: { 
      article: articles?.[0] || null, 
      categories: categories || [] 
    },
    revalidate: 1,
  }
}


export default Article
