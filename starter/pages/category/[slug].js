import Articles from "../../components/articles"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories")

  return {
    paths: (categories || []).map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const categoryRes = await fetchAPI(`/categories?filters[slug][$eq]=${params.slug}&populate[articles][populate]=*`)
  const categories = await fetchAPI("/categories?populate=*")

  return {
    props: { 
      category: categoryRes?.[0] || null, 
      categories: categories || [] 
    },
    revalidate: 1,
  }
}


export default Category
