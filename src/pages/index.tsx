import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Landing } from "../components/Landing"

import { createGlobalStyle } from 'styled-components';
import { IndexStyle } from "../components/style"

const GlobalStyle = createGlobalStyle`${IndexStyle}`;

import { useGlobalState } from '../context'
  

const IndexPage = () => {
  const [bg, setBG] = useGlobalState('bg')

  if(typeof(window) !== "undefined") document.documentElement.style.backgroundImage = `url(${bg})`

  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <Landing />
    </Layout>
  )
}

export default IndexPage
