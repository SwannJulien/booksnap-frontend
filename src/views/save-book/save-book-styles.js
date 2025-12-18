import { css } from 'lit';
import { sharedStyles } from '../../shared-styles.js';

export const saveBook = [
  sharedStyles,
  css`
    :host {
      display: block;
      width: 100%;
      max-width: 1500px;
    }

    .intro-container {
      margin-bottom: 3rem;
    }

    .cover-container {
      grid-column: 2;
      margin-bottom: 2em;
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .book-cover {
      max-width: 100px;
      height: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .no-cover-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 10em;
      width: 8.5em;
      background-color: #dedede;
    }

    .no-cover {
      text-align: center;
      color: var(--clr-light-gray);
      font-size: var(--step-1);
    }

    .cover-input {
      display: none;
    }
  `,
];
