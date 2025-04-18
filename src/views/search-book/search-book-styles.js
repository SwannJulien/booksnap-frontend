import { css } from 'lit';

export const searchBook = css`
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

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      height: auto;
    }

    .right-panel {
      border-left: none;
      border-top: solid black 1px;
    }

    .left-panel,
    .right-panel {
      padding: 1rem;
    }
  }
`;
