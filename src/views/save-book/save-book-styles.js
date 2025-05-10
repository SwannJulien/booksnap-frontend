import { css } from 'lit';

export const saveBook = css`
  :host {
    display: block;
  }

  .book-details {
    margin-bottom: 2em;
  }

  .cover-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
  }

  .book-cover {
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .no-cover {
    width: 300px;
    height: 450px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #666;
  }

  .cover-upload {
    cursor: pointer;
    padding: 0.5em 1em;
    background: var(--clr-accent);
    color: var(--clr-font);
    border-radius: 4px;
    font-size: var(--step-0);
    border: none;
  }

  .cover-input {
    display: none;
  }

  .book-card {
    text-align: center;
    padding: 1rem;
  }

  label {
    text-align: left;
    padding-right: 1em;
    font-size: var(--step-1);
  }

  input {
    padding: 0.5em;
    border: 1px solid #ccc;
    font-size: var(--step-0);
    margin-right: 1em;
  }

  .button-submit {
    grid-column: 2;
    background-color: var(--clr-accent);
    color: var(--clr-font);
    border: none;
    width: 9em;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: var(--step-0);
  }
`;
