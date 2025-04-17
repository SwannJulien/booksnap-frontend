import { css } from 'lit';

export const booksnapApp = css`
  :host {
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    max-width: 960px;
    margin: 0 auto;
    background-color: var(--booksnap-frontend-background-color);
  }

  #camera video {
    width: 100%;
    max-width: 640px;
  }

  #camera {
    width: 100%;
  }
`;
