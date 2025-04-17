import { css } from 'lit';

export const searchBook = css`
  :host {
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    height: 40vh;
  }

  .left-panel,
  .right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }

  .right-panel {
    border-left: solid black 1px;
  }

  .input-field {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
`;
