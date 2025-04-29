import { css } from 'lit';

export const barecodeScanner = css`
  video {
    width: 100%;
    max-width: 100%;
    height: auto;
    border: 2px solid #ccc;
    border-radius: 8px;
  }

  button {
    background-color: #4fd1c5;
    color: var(--clr-black);
    border: none;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: var(--step-0);
  }
`;
