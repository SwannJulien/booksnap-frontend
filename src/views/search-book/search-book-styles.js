import { css } from 'lit';
import { resetStyles } from '../../shared-styles.js';

export const searchBook = [
  resetStyles,
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

    .tab-content {
      padding: 1.5em 1.5em;
      margin-top: 2rem;
      border-radius: var(--border-radius-default);
      background: var(--clr-gray);
    }

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    label {
      text-align: left;
      padding-right: 1em;
      font-size: var(--step-1);
    }

    input,
    select {
      padding: 0.5em;
      border: 1px solid #ccc;
      font-size: var(--step-0);
      margin-right: 1em;
    }

    option {
      background-color: white;
    }

    .button-submit {
      grid-column: 2;
      background-color: var(--clr-accent);
      color: var(--clr-text-light);
      border: none;
      width: 9em;
      padding: 0.5em 1em;
      cursor: pointer;
      font-size: var(--step-0);
    }

    h2 {
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
    }
  `,
];
