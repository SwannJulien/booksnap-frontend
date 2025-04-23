import { css } from 'lit';

export const searchBook = css`
  :host {
    display: block;
    max-width: 1200px;
  }

  .tabs {
    display: flex;
    justify-content: flex-start;
  }

  .tabs button {
    padding: 0.5em 1em;
    border: none;
    background-color: #2c2c2c;
    color: var(--clr-bkg);
    cursor: pointer;
    font-size: var(--step-0);
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 0.5em 0.5em 0 0;
  }

  .tabs button.active {
    background: var(--clr-accent);
    color: #ffffff;
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
    color: white;
    border: none;
    padding: 0.5em 1em;
    /* border-radius: 0.5em; */
    cursor: pointer;
    font-size: var(--step-0);
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
