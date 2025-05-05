import { css } from 'lit';

export const displayBook = css`
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
  }

  .cover-input {
    display: none;
  }

  .book-card {
    text-align: center;
    padding: 1rem;
  }
`;
