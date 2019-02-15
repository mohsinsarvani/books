import React from 'react';
import { graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Book from '../components/Book';
import SearchBox from '../components/SearchBox';
import YearFilterButton from '../components/YearFilterButton';
import mq from '../components/mediaQueries';

const IndexPage = ({ data: { allBooksJson, allImagesJson } }) => {
  const [edges, setEdges] = React.useState(allBooksJson.edges);
  const [originalEdges] = React.useState(allBooksJson.edges);

  const years = originalEdges.map(book => book.node.yearRead);
  const yearFilters = years.filter(
    (year, index) => years.indexOf(year) >= index
  );
  const [amazonImage] = allImagesJson.edges;

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

  return (
    <Layout location="header">
      <div
        className={css`
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 335px));
          justify-content: center;
        `}
      >
        <button
          type="button"
          className={css`
            height: 30px;
            background: #4b4545b3;
            color: #c2c2c2;
            text-align: center;
            align-items: center;
            border: none;
          `}
          onClick={() => handleClearYearFilter()}
        >
          All
        </button>
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
      <div
        className={css`
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr repeat(auto-fit);
          margin: 0 200px 0 200px;
          ${mq.xl(
            css`
              margin: 0 20px 0 20px;
            `
          )}
        `}
      >
        <SearchBox onSearch={handleSearch} />
        {edges.map(book => {
          return (
            <Book
              key={book.node.id}
              book={book.node}
              amazonImage={amazonImage}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const bookQuery = graphql`
  {
    allImagesJson(filter: { imageName: { eq: "amazonLink" } }) {
      edges {
        node {
          id
          imageName
          siteImage {
            id
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allBooksJson {
      edges {
        node {
          id
          yearRead
          isbn
          title
          author
          amazonUrl
          description
          localImage {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
