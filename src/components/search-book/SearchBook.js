import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from '../../api/books.js';
import { searchBook } from './SearchBook-styles.js';

export class SearchBook extends LitElement {
  static styles = [searchBook];

  static properties = {
    book: { type: Object },
    isbn: { type: String },
  };

  constructor() {
    super();
    this.book = null;
    this.isbn = '';
  }

  async handleBareCodeScanned(event) {
    this.isbn = event.detail.code ? event.detail.code.trim() : this.isbn.trim();
    try {
      this.book = await fetchBookByIsbn(this.isbn);
      this.dispatchEvent(
        new CustomEvent('getBook', {
          bubbles: true,
          composed: true,
          detail: { book: this.book },
        }),
      );
    } catch (error) {
      console.error(error);
      this.book = null;
    }
  }

  handleInputChange(event) {
    this.isbn = event.target.value;
  }

  handleManualSubmit() {
    if (this.isbn.trim()) {
      console.log(this.isbn);

      this.dispatchEvent(
        new CustomEvent('sendBarecode', {
          bubbles: true,
          composed: true,
          detail: { code: this.isbn },
        }),
      );
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="left-panel">
          <h2>Use your device to scan the book’s barcode</h2>
          <barecode-scanner
            @sendBarecode=${this.handleBareCodeScanned}
          ></barecode-scanner>
        </div>
        <div class="right-panel">
          <h2>Type the ISBN here</h2>
          <div class="input-field">
            <input
              type="text"
              id="isbnInput"
              placeholder="Enter ISBN here"
              .value=${this.isbn}
              @input=${this.handleInputChange}
            />
            <button @click=${this.handleBareCodeScanned}>Submit ISBN</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('search-book', SearchBook);
