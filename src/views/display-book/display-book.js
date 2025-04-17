import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from '../../api/books.js';
import { displayBook } from './display-book-styles.js';

export class DisplayBook extends LitElement {
  static styles = [displayBook];

  constructor() {
    super();
    this.book = null;
  }

  static properties = {
    book: { type: Object },
  };

  async connectedCallback() {
    super.connectedCallback();

    const params = new URLSearchParams(window.location.search);
    const isbn = params.get('isbn');

    if (isbn) {
      try {
        const book = await fetchBookByIsbn(isbn);
        const [firstBook] = Object.values(book);
        this.book = firstBook;
      } catch (err) {
        console.error('Error fetching book:', err);
      }
    }
  }

  render() {
    if (!this.book) {
      return html`
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      `;
    }
    return html`
      <div class="book-card">
        <h2>${this.book.title}</h2>
        <p>
          <strong>Author:</strong> ${this.book.authors?.[0]?.name || 'Unknown'}
        </p>
        <p><strong>Published:</strong> ${this.book.publish_date || 'N/A'}</p>
        <img src="${this.book.cover.medium}" alt="Book cover" />
      </div>
    `;
  }
}

customElements.define('display-book', DisplayBook);
