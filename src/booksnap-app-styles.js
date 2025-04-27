import { css } from 'lit';

export const booksnapApp = css`
  :host {
    min-height: 100vh;
    color: var(--clr-font);
    display: grid;
    grid-template-columns: auto 1fr;
    padding-right: 2em;
    gap: 2em;
    overflow: hidden;
  }

  main {
    overflow: auto;
    height: 100vh;
    padding-top: 20px;
  }

  #sidebar {
    box-sizing: border-box;
    height: 100%;
    padding-top: 20px;
    width: clamp(200px, 20vw, 250px);
    border-right: 1px solid #000000;
    background-color: var(--clr-dark);
    color: var(--clr-light);

    position: sticky;
    top: 0;
    align-self: start;
    transition: 300ms ease-in-out;
    overflow-x: hidden;
    overflow-y: auto;
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
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
  }

  #sidebar ul > li:first-child {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    .logo {
      font-weight: 600;
    }
  }

  #sidebar ul li:nth-child(7) {
    margin-top: auto;
  }
  #sidebar ul li:nth-child(8) {
    padding-bottom: 16px;
  }

  #sidebar ul li.active a {
    color: var(--clr-accent);

    svg {
      fill: var(--clr-accent);
    }
  }

  #sidebar svg {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    fill: var(--clr-light);
  }

  #sidebar a,
  #sidebar .logo {
    border-radius: 0.5em;
    padding: 0.85em;
    text-decoration: none;
    color: var(--clr-light);
    display: flex;
    align-items: center;
    gap: 1em;
  }

  #sidebar a:hover {
    background-color: var(--clr-nav-hover);
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
    background-color: var(--clr-nav-hover);
  }

  @media (max-width: 48rem) {
    :host {
      grid-template-columns: 1fr;
      padding-right: 0;
    }
    main {
      padding: 2em 1em 60px 1em;
    }

    #sidebar {
      height: 60px;
      width: 100%;
      border-right: none;
      border-top: 1px solid #000000;
      padding: 0;
      position: fixed;
      top: unset;
      bottom: 0;
      display: flex;
      justify-content: center;

      > ul {
        margin: 0;
        padding: 0;
        display: grid;
        grid-auto-columns: 60px;
        grid-auto-flow: column;
        align-items: center;
        overflow-x: scroll;
        overflow-y: hidden;
      }

      ul li {
        height: 100%;
      }

      ul li span,
      ul li:first-child {
        display: none;
      }

      ul li:nth-child(8) {
        padding-bottom: 0;
      }

      ul a {
        width: 60px;
        height: 60px;
        padding: 0;
        border-radius: 0;
        justify-content: center;
      }

      a {
        box-sizing: border-box;
        padding: 1em;
        width: auto;
        justify-content: center;
      }
    }
  }
`;
