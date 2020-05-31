/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Header } from "./Header"
import { Sidebar } from './Sidebar';
import { News } from "./News"

import { Style } from './style';

import { useGlobalState } from '../context'

import axios from 'axios';

import { createGlobalStyle } from 'styled-components';
import { CoverSheet } from "./Sidebar/style";

const GlobalStyle = createGlobalStyle`${Style}`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')
  const [bg, setBG] = useGlobalState('bg')

  React.useState(() => {
    if(bg !== undefined) return;

    axios.get('https://source.unsplash.com/random/1920x1080)', { responseType: 'arraybuffer', maxRedirects: 0 })
      .then(res => {
        const blob = new Blob([res.data]);
        const data = URL.createObjectURL(blob);
        setBG(data)
      })
  })

  return (
    <>
      <CoverSheet visible={sidebarVisible} onClick={() => setSidebarVisible(false)} />
      <Sidebar enabled={sidebarVisible} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          padding: `0px 32px`,
          marginTop: '-72px'
        }}
      >
        {children}
      </div>
      <News />
      <GlobalStyle />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
