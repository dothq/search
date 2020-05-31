import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <div style={{ textAlign: 'center', paddingTop: '28vh' }}>
      <img src={"https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f644.svg"} width={64} />
      <h1 style={{ marginBottom: '8px', fontSize: '4rem', fontWeight: 800 }}>404</h1>
      <p>We couldn't find that page.</p>
    </div>
  </Layout>
)

export default NotFoundPage
