import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from '../../api/books.js';
import { displayBook } from './display-book-styles.js';
import '../../components/spinner.js';

export class DisplayBook extends LitElement {
  static styles = [displayBook];

  constructor() {
    super();
    this.book = null;
    this.showNotFound = false;
  }

  static properties = {
    book: { type: Object },
    showNotFound: { type: Boolean },
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
        console.error(err);
      }
    }
  }

  async handleCoverChange(e) {
    const file = e.target.files[0];
    if (file) {
      try {
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);
        this.book = {
          ...this.book,
          cover: {
            ...this.book.cover,
            large: objectUrl,
          },
        };
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    if (!this.book) {
      if (this.showNotFound) {
        return html`<h2>Book not found</h2>`;
      }
      setTimeout(() => {
        this.showNotFound = true;
        this.requestUpdate();
      }, 3000);
      return html`<spinner-element></spinner-element>`;
    }
    return html`
      ${console.log(this.book)}
      <form @submit=${this.handleFormSubmit}>
        <div class="cover-container">
          ${this.book.cover?.large
            ? html`<img
                src="${this.book.cover.large}"
                alt="Book cover"
                class="book-cover"
              />`
            : html`<div class="no-cover">No cover available</div>`}
          <label class="cover-upload">
            Change Cover
            <input
              type="file"
              accept="image/*"
              @change=${this.handleCoverChange}
              class="cover-input"
            />
          </label>
        </div>

        <label>
          Title:
          <input
            type="text"
            name="title"
            .value="${this.book.title}"
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            .value="${this.book.authors?.[0]?.name || 'Unknown'}"
            required
          />
        </label>
        <label>
          Publish Date:
          <input
            type="date"
            name="publishDate"
            .value="${this.book.publish_date || ''}"
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            .value="${this.book.identifiers?.isbn_10
              ? this.book.identifiers?.isbn_10
              : this.book.identifiers?.isbn_13 || ''}"
          />
        </label>
        <button class="button-submit" type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('display-book', DisplayBook);
