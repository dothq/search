import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Landing } from "../components/Landing"

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Home" />
    <Landing />
  </Layout>
)

export default IndexPage
