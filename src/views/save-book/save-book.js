import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from '../../api/books.js';
import '../../components/spinner-element.js';
import { saveBook } from './save-book-styles.js';

export class SaveBook extends LitElement {
  static styles = [saveBook];

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
      }, 10000);
      return html`<spinner-element></spinner-element>`;
    }
    return html`
      ${console.log(this.book)}
      <div class="cover-container">
        ${this.book?.cover?.medium
          ? html`<img
              src="${this?.book?.cover?.medium}"
              alt="Book cover"
              class="book-cover"
            />`
          : html`<div class="no-cover">No cover available</div>`}

        <label class="cover-upload" for="cover-upload">Change Cover</label>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          @change=${this.handleCoverChange}
          class="cover-input"
        />
      </div>
      <form-element @submit=${this.handleFormSubmit}>
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          .value="${this.book.title}"
          required
        />

        <label for="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          .value="${this.book.authors?.[0]?.name || 'Unknown'}"
          required
        />

        <label for="publishDate">Publish Date</label>
        <input
          id="publishDate"
          type="text"
          name="publishDate"
          .value="${this.book.publish_date || ''}"
        />

        <label for="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          name="isbn"
          .value="${this.book.identifiers?.isbn_10
            ? this.book.identifiers?.isbn_10
            : this.book.identifiers?.isbn_13 || ''}"
        />

        <button class="button-submit" type="submit">Submit</button>
      </form-element>
    `;
  }
}

customElements.define('save-book', SaveBook);
