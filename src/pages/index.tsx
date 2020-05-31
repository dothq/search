import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Landing } from "../components/Landing"

import { createGlobalStyle } from 'styled-components';
import { IndexStyle } from "../components/style"

const GlobalStyle = createGlobalStyle`${IndexStyle}`;  

const IndexPage = () => {
  return (
    <Layout isLanding>
      <SEO title="Home" />
      <GlobalStyle />
      <Landing />
    </Layout>
  )
}

export default IndexPage
