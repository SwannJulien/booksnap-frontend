import { Router } from '@vaadin/router';
import { LitElement, html } from 'lit';

import { booksnapApp } from './booksnap-app-styles.js';
import './components/barecode-Scanner/barecode-scanner.js';
import './views/display-book/display-book.js';
import './views/home-view/home-view.js';
import './views/search-book/search-book.js';

class BooksnapApp extends LitElement {
  static styles = [booksnapApp];

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('main'));

    router.setRoutes([
      {
        path: '/',
        component: 'home-view',
      },
      {
        path: '/search',
        component: 'search-book',
        action: async () => {
          await import('./views/home-view/home-view.js');
        },
      },
      {
        path: '/book',
        component: 'display-book',
        action: async () => {
          await import('./views/display-book/display-book.js');
        },
      },
      {
        path: '(.*)',
        redirect: '/',
      },
    ]);
  }

  render() {
    return html` <main></main> `;
  }
}

customElements.define('booksnap-app', BooksnapApp);
