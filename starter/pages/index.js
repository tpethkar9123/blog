import React from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ articles, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel with population
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?populate=*"),
    fetchAPI("/categories?populate=*"),
    fetchAPI("/homepage?populate=*").catch(() => null), // Use null if missing

  ])

  return {
    props: { 
      articles: articles || [], 
      categories: categories || [], 
      homepage: homepage || { hero: { title: "Welcome" }, seo: {} } 
    },
    revalidate: 1,
  }
}


export default Home
