import { LitElement, html } from 'lit';

import { booksnapApp } from './BooksnapApp-styles.js';
import './components/barecode-Scanner/BarecodeScanner.js';
import './components/display-book/DisplayBook.js';
import './components/search-book/SearchBook.js';

class BooksnapApp extends LitElement {
  static properties = {
    inputText: { type: String },
    book: { type: Object },
  };

  constructor() {
    super();
    this.inputText = '';
    this.book = null;
  }

  static styles = [booksnapApp];

  handleGetBook(event) {
    this.book = event.detail.book;
    console.log(this.book);
  }

  render() {
    return html`
      <search-book @getBook=${this.handleGetBook}></search-book>
      ${this.book
        ? html` <display-book
            .book=${Object.values(this.book)[0]}
          ></display-book>`
        : html``}
    `;
  }
}

customElements.define('booksnap-app', BooksnapApp);
