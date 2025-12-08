import { Router } from '@vaadin/router';
import { LitElement, html } from 'lit';

import '../../components/barecode-scanner/barecode-scanner.js';
import '../save-book/save-book.js';
import '../../components/button-bks/button-bks.js';
import { searchBook } from './search-book-styles.js';

export class SearchBook extends LitElement {
  static styles = [searchBook];

  static properties = {
    book: { type: Object },
    isbn: { type: String },
    activeTab: { type: String },
  };

  constructor() {
    super();
    this.book = null;
    this.isbn = '';
    this.activeTab = 'scan';
  }

  async handleBareCodeScanned(event) {
    this.isbn = event.detail.code ? event.detail.code.trim() : this.isbn.trim();
    if (this.isbn) {
      Router.go(`/book?isbn=${this.isbn}`);
    }
  }

  handleInputChange(event) {
    this.isbn = event.target.value;
  }

  render() {
    return html`
      <div class="tabs">${this.tabsTpl}</div>
      <div class="tab-content">${this.tabContentTpl}</div>
    `;
  }

  get tabsTpl() {
    return html`  
        <button
          class=${this.activeTab === 'scan' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'scan';
          }}
        >
          Scan Barcode
        </button>
        <button
          class=${this.activeTab === 'isbn' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'isbn';
          }}
        >
          Enter ISBN
        </button>
        <button
          class=${this.activeTab === 'form' ? 'active' : ''}
          @click=${() => {
            this.activeTab = 'form';
          }}
        >
          Fill Form
        </button>
      </div>`;
  }

  get tabContentTpl() {
    switch (this.activeTab) {
      case 'scan':
        return this.scanTabTpl;
      case 'isbn':
        return this.isbnTabTpl;
      case 'form':
        return this.formTabTpl;
      default:
        return this.scanTabTpl;
    }
  }

  get scanTabTpl() {
    return html`
      <div class="scan-tab">
        <h2>Scan your book's barecode to get its details automatically</h2>
        <barecode-scanner
          @sendBarecode=${this.handleBareCodeScanned}
        ></barecode-scanner>
      </div>
    `;
  }

  get isbnTabTpl() {
    return html`
      <div class="isbn-tab">
        <h2>Enter your book's ISBN here to get its details automatically</h2>
        <div class="input-field">
          <input
            type="text"
            id="isbnInput"
            placeholder="Enter ISBN here"
            .value=${this.isbn}
            @input=${this.handleInputChange}
          />
          <button-bks label="Submit ISBN"> </button-bks>
        </div>
      </div>
    `;
  }

  get formTabTpl() {
    return html`
      <div class="form-tab">
        <h2>Fill in the book details</h2>
        <form @submit=${this.handleFormSubmit}>
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            placeholder="ex: The Great Gatsby"
          />

          <label for="author">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            required
            placeholder="ex: F. Scott Fitzgerald, John Doe"
          />

          <label for="publishYear">Publish Year</label>
          <input
            id="publishYear"
            type="text"
            name="publishYear"
            placeholder="ex: 1925"
          />

          <label for="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            placeholder="ex: 1234567890 or 1234567890123"
          />

          <label for="type">Book type</label>
          <select id="type" name="type" required>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
          </select>

          <button-bks type="submit" label="Submit"> </button-bks>
        </form>
      </div>
    `;
  }
}

customElements.define('search-book', SearchBook);
