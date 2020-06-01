import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button } from "../components/Button"

const NotFoundPage = () => {

  const goPreviousPage = () => {
    if(typeof(window) !== "undefined") window.history.go(-1);
  }

  return (
      <Layout>
      <SEO title="404: Not found" />
      <div style={{ textAlign: 'center', paddingTop: '28vh' }}>
        <img src={"https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f644.svg"} width={64} />
        <h1 style={{ marginBottom: '8px', fontSize: '4rem', fontWeight: 800 }}>404</h1>
        <p>We couldn't find that page.</p>
        <Button onClick={goPreviousPage} style={{ width: '241.61px', margin: '0 auto' }}>Return to previous page</Button>
      </div>
    </Layout>
  )
}

export default NotFoundPage
