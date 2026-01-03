import { css } from 'lit';
import { sharedStyles } from '../../shared-styles.js';

export const searchBook = [
  sharedStyles,
  css`
    :host {
      display: block;
      width: 100%;
      max-width: 1500px;
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

    .create-book-form:not([hidden]) {
      display: grid;
      grid-template-columns: 15% 50%;
      gap: 1em;
      align-items: center;

      @media (max-width: 75rem) {
        grid-template-columns: 1fr;
      }
    }

    .find-by-isbn-form:not([hidden]) {
      display: flex;
      flex-direction: column;
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
      height: 27rem;
      border-radius: var(--border-radius-default);
      background-color: var(--clr-text-light);
      color: var(--clr-dark-secondary);

      h2,
      p {
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

    .cover-container {
      display: flex;
      flex-direction: column;
      grid-column: 2;

      img {
        width: 120px;
        height: auto;
      }
      input {
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
      }
    }

    .cover-preview {
      max-width: 20rem;
      max-height: 15rem;
      border-radius: var(--border-radius-default);
      box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.18),
        0 2px 6px rgba(0, 0, 0, 0.12);
      border: 1px solid rgba(0, 0, 0, 0.08);
      object-fit: cover;
      display: block;
    }

    .no-cover-container {
      display: flex;
      padding: 1rem;
      width: 100px;
      height: 150px;
      background-color: gray;
    }

    .no-cover {
      align-content: center;
      text-align: center;
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

      .modal-content > *:not(.qr-code, p) {
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
