import { css } from 'lit';

export const searchBook = css`
  :host {
    display: block;
    max-width: 1200px;
  }

  .tabs {
    display: flex;
    justify-content: flex-start;
    border: none;
  }

  .tabs button {
    padding: 1em;
    cursor: pointer;
    font-size: var(--step-0);
  }

  .tabs button.active {
    border-bottom: 5px solid var(--clr-accent);
    font-weight: bold;
  }

  .tab-content {
    padding: 1em;
    border: 1px solid #ccc;
    background: white;
  }

  .button-submit {
    background-color: var(--clr-accent);
    width: 9rem;
    color: var(--clr-font);
    border: none;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: var(--step-0);
    font-weight: bold;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .input-field input,
  form input {
    padding: 0.5em;
    border: 1px solid #ccc;
    font-size: var(--step-0);
  }

  @media (max-width: 768px) {
  }
`;
