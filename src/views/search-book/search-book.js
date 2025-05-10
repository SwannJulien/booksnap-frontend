import { Router } from '@vaadin/router';
import { LitElement, html } from 'lit';

import '../../components/barecode-Scanner/barecode-scanner.js';
import '../../components/form-element.js';
import '../save-book/save-book.js';
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
      <div class="tabs">
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
      </div>

      <div class="tab-content">
        ${this.activeTab === 'scan'
          ? html`
              <div class="scan-tab">
                <h2>
                  Scan your book's barecode to get its details automatically
                </h2>
                <barecode-scanner
                  @sendBarecode=${this.handleBareCodeScanned}
                ></barecode-scanner>
              </div>
            `
          : ''}
        ${this.activeTab === 'isbn'
          ? html`
              <div class="isbn-tab">
                <h2>
                  Enter your book's ISBN here to get its details automatically
                </h2>
                <div class="input-field">
                  <input
                    type="text"
                    id="isbnInput"
                    placeholder="Enter ISBN here"
                    .value=${this.isbn}
                    @input=${this.handleInputChange}
                  />
                  <button
                    class="button-submit"
                    @click=${this.handleBareCodeScanned}
                  >
                    Submit ISBN
                  </button>
                </div>
              </div>
            `
          : ''}
        ${this.activeTab === 'form'
          ? html`
              <div class="form-tab">
                <h2>Fill in the book details</h2>
                <form-element @submit=${this.handleFormSubmit}>
                  <label for="title">Title</label>
                  <input id="title" type="text" name="title" required />

                  <label for="author">Author</label>
                  <input id="author" type="text" name="author" required />

                  <label for="publishDate">Publish Date</label>
                  <input id="publishDate" type="date" name="publishDate" />

                  <label for="isbn">ISBN</label>
                  <input id="isbn" type="text" name="isbn" />

                  <button class="button-submit" type="submit">Submit</button>
                </form-element>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('search-book', SearchBook);
