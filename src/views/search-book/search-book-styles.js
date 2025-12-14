import { css } from 'lit';
import { sharedStyles } from '../../shared-styles.js';

export const searchBook = [
  sharedStyles,
  css`
    :host {
      display: block;
      max-width: 1200px;
    }

    .tabs {
      display: flex;
      max-width: 380px;
      gap: 20px;
    }

    .tabs button {
      padding: 1em 0;
      width: 12rem;
      background-color: var(--clr-dark-secondary);
      border: none;
      border-bottom: 2px solid transparent;
      font-size: var(--step-0);
      text-align: left;
      color: var(--clr-text-muted);
      cursor: pointer;
    }

    .tabs button.active {
      border-bottom: 2px solid var(--clr-accent);
      color: var(--clr-accent);
    }

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 1em;

      input {
        max-width: 30rem;
      }
    }
  `,
];
