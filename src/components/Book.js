import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from './mediaQueries';

const Book = ({ book }) => {
  return (
    <div
      className={css`
        display: grid;
        grid-gap: 20px;
        grid-template-rows: 75px 1fr;
        background: #dce0e6;
      `}
    >
      <div
        className={css`
          background: #567ebb;
          padding-left: 20px;
        `}
      >
        <h1>
          <a
            className={css`
              text-decoration: none;
            `}
            href={book.amazonUrl}
          >
            {book.title}
          </a>
        </h1>
      </div>
      <div
        className={css`
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 300px 1fr;
          ${mq.lg(css`
            grid-template-columns: 300px 1fr;
          `)} grid-gap: 20px;
          color: #1f1f20;
          padding: 20px;
        `}
      >
        <img
          className={css`
            width: 300px;
          `}
          src={book.imageUrl}
          alt={book.title}
        />
        <div>
          <h2>{book.author}</h2>
          <h3>{book.description}</h3>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    amazonUrl: PropTypes.string,
  }),
};

Book.defaultProps = {
  book: {},
};

export default Book;
