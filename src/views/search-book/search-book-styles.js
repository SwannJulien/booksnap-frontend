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

    .modal {
      position: fixed;
      inset: 0px;
      width: 17rem;
      height: 30rem;
      margin: auto;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      width: 30rem;
      height: 22rem;
      border-radius: var(--border-radius-default);
      background-color: var(--clr-text-light);
      color: var(--clr-dark-secondary);

      h2 {
        text-align: center;
      }
    }

    .close-modal-btn {
      cursor: pointer;
      align-self: end;
      font-size: 3rem;
      background: none;
      border: none;
    }

    .blurred {
      filter: blur(2px);
    }

    .qr-code {
      width: fit-content;
      margin-inline: auto;
    }

    .print-btn {
      margin-inline: auto;
    }

    @media print {
      .blurred,
      .tabs,
      .card {
        display: none !important;
      }

      .modal {
        position: static;
        width: 100%;
        height: auto;
      }

      .modal-content {
        box-shadow: none;
        border: none;
        background: white;
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-content > *:not(.qr-code) {
        display: none !important;
      }

      .qr-code {
        display: block;
        max-width: 100%;
        page-break-inside: avoid;
      }

      .error-message {
        text-align: center;
      }
    }
  `,
];
