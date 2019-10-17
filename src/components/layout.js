/** @jsx jsx */
// eslint-disable-next-line
import React from "react"
import PropTypes from "prop-types"
import { jsx, css, Global } from "@emotion/core"
import styled from "@emotion/styled"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import Footer from "./footer"
import mq from "./media-queries"
import "normalize.css"

const PageContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  min-height: 100vh;
  grid-template-rows: auto auto auto auto;
  background: #636080;
`

const PageTitleWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  background: #1f1f20;
  align-items: center;
  padding: 20px 0 20px 0;
`

const Title = styled.h1`
  margin: 0.67em 2em;
  ${mq.sm(css`
    margin: 0 0.67em 0 0.67em;
  `)};
`

const TitleLink = styled.a`
  text-decoration: none;
`

const BreadcrumbWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  align-content: start;
  margin: 0.67em 2em;
  ${mq.sm(css`
    margin: 0 0.67em 0 0.67em;
  `)};
`

const MainWrapper = styled.div`
  margin: 0.67em 2em;
  ${mq.sm(css`
    margin: 0 0.67em 0 0.67em;
  `)};
`

const Layout = ({ children, crumbs, crumbLabel }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const disableLinks = ["/book"]

  return (
    <>
      <Global
        styles={css`
          body {
            color: #d3dbe8;
          }
          a {
            color: #dce0e6;
          }
        `}
      />
      <Helmet
        title={title}
        meta={[
          { name: "Books", content: "Books I have read" },
          { name: "good books", content: "good books" },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <PageContainer>
        <PageTitleWrapper>
          <Title>
            <TitleLink href="/">{title}</TitleLink>
          </Title>
        </PageTitleWrapper>
        <BreadcrumbWrapper>
          <Breadcrumb
            crumbs={crumbs}
            crumbLabel={crumbLabel}
            disableLinks={disableLinks}
          />
        </BreadcrumbWrapper>
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </PageContainer>
    </>
  )
}

Layout.defaultProps = {
  crumbLabel: "",
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape(),
      pathname: PropTypes.string.isRequired,
    })
  ).isRequired,
  crumbLabel: PropTypes.string,
}

export default Layout
