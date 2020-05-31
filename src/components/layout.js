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

import { createGlobalStyle } from 'styled-components';

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

  const [sidebarVisible] = useGlobalState('sidebarVisible')

  return (
    <>
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
