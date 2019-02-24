/** @jsx jsx */
import React from 'react';
import { graphql, Link } from 'gatsby';
import { navigate } from '@reach/router';
import { jsx, css } from '@emotion/core';
import Layout from '../components/layout';
import Book from '../components/Book';
import SearchBox from '../components/SearchBox';
import YearFilterButton from '../components/YearFilterButton';
import mq from '../components/mediaQueries';
import { Button } from '../components/styled/button';
import { useBreadcrumb } from '../components/useBreadcrumb';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';

const IndexPage = ({ location, data: { allSanityBook } }) => {
  const [edges, setEdges] = React.useState(allSanityBook.edges);
  const [originalEdges] = React.useState(allSanityBook.edges);

  const years = originalEdges.map(book => book.node.yearRead);
  const yearFilters = years.filter(
    (year, index) => years.indexOf(year) >= index
  );

  const handleClearSearchBox = () => {
    const input = document.querySelector('#books-search-input');
    input.value = '';
  };

  const handleClearYearFilter = () => {
    handleClearSearchBox();
    setEdges(originalEdges);
  };

  const handleYearFilter = year => {
    handleClearSearchBox();
    setEdges(originalEdges);
    setEdges(originalEdges.filter(book => book.node.yearRead === year));
  };

  const handleSearch = ({ target }) => {
    if (!target.value || target.value === '') {
      setEdges(originalEdges);
    } else {
      setEdges(
        originalEdges.filter(
          book =>
            book.node.title
              .toLowerCase()
              .includes(target.value.toLowerCase()) ||
            book.node.author.toLowerCase().includes(target.value.toLowerCase())
        )
      );
    }
  };

  const { crumb, updateCrumb } = useBreadcrumb(location);
  console.log('crumb in index: ', crumb);

  return (
    <Layout location="header">
      <div
        css={css`
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 335px));
          justify-content: center;
        `}
      >
        <Link to="/test">test</Link>
        <Link to="/test2">test2</Link>
        <Button type="button" onClick={() => handleClearYearFilter()}>
          All
        </Button>
        {yearFilters.map(year => {
          return (
            <YearFilterButton
              key={Math.random()}
              onYearFilter={handleYearFilter}
              year={year}
            />
          );
        })}
      </div>
      <div>
        <SearchBox onSearch={handleSearch} />
        <Breadcrumb breadcrumb={crumb} />
        <div
          css={css`
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(auto-fit, 300px);
            justify-content: center;
            color: #1f1f20;
            ${mq.md(css`
              grid-template-columns: 1fr;
            `)};
            ${mq.lg(
              css`
                maxheight: '460px';
              `
            )}
          `}
        >
          {edges.map(book => {
            return (
              <div
                key={book.node.id}
                css={css`
                  display: grid;
                  grid-gap: 20px;
                  grid-template-rows: 1fr;
                `}
              >
                <button
                  css={css`
                    padding: 20px;
                    border: none;
                    background: #606d80;
                    &:hover {
                      background: #607d80;
                      cursor: pointer;
                    }
                  `}
                  onClick={() => navigate(`/book/${book.node.id}`)}
                >
                  <Book book={book.node} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const bookQuery = graphql`
  {
    allSanityBook(sort: { fields: title, order: ASC }) {
      edges {
        node {
          id
          amazonUrl
          title
          isbn
          description
          author
          amazonUrl
          imageUrl
          yearRead
          image {
            asset {
              fluid(maxHeight: 500) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;
