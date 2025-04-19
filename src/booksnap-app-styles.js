import { css } from 'lit';

export const booksnapApp = css`
  :host {
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    max-width: 960px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2em;
  }

  #sidebar {
    box-sizing: border-box;
    height: 100vh;
    width: 300px;
    padding: 5px 1em;
    border-right: 1px solid #000000;
    background-color: #2c2c2c;
    color: #ededed;

    position: sticky;
    top: 0;
    align-self: start;
    transition: 300ms ease-in-out;
    overflow: hidden;
    text-wrap: nowrap;
  }

  #sidebar.close {
    width: 60px;
    padding: 2px;

    a {
      padding: 0.5em;
    }
  }

  #sidebar ul {
    list-style: none;
    padding: 0;
  }

  #sidebar ul > li:first-child {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    .logo {
      font-weight: 600;
    }
  }

  #sidebar ul li.active a {
    color: #85e0fc;

    svg {
      fill: #85e0fc;
    }
  }

  #sidebar svg {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    fill: #ededed;
  }

  #sidebar a,
  #sidebar .logo {
    border-radius: 0.5em;
    padding: 0.85em;
    text-decoration: none;
    color: #ededed;
    display: flex;
    align-items: center;
    gap: 1em;
  }

  #sidebar a:hover {
    background-color: #3b3b3b;
  }

  #toggle-btn {
    margin-left: auto;
    padding: 1em;
    border: none;
    border-radius: 0.5em;
    background: none;
    cursor: pointer;
  }

  #toggle-btn:hover {
    background-color: #3b3b3b;
  }
`;
