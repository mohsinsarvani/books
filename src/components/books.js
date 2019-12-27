import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { navigate } from "gatsby"
import { css } from "@emotion/core"
import BookImage from "./book-image"
import mq from "./media-queries"

const BookWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr;
`

const BooksWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 300px);
  justify-content: center;
  color: #1f1f20;
  ${mq.xl(
    css`
      grid-template-columns: repeat(auto-fit, 300px);
    `
  )};
  ${mq.sm(css`
    grid-template-columns: 1fr;
  `)};
`

const BookButton = styled.button`
  padding: 20px;
  border: none;
  background: #606d80;
  box-shadow: 0px 1px 1px 0px rgba(26, 25, 26, 1);
  &:hover {
    background: #607d80;
    cursor: pointer;
  }
`

const Book = ({ books }) => (
  <BooksWrapper>
    {books.map(book => (
      <BookWrapper key={book.node.id}>
        <BookButton
          type="button"
          onClick={() => navigate(`/book/${book.node.id}`)}
        >
          <BookImage book={book.node} />
        </BookButton>
      </BookWrapper>
    ))}
  </BooksWrapper>
)

Book.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        book: PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            tagsSet: PropTypes.arrayOf(PropTypes.string),
          }),
        }),
      }),
    })
  ).isRequired,
}

export default Book