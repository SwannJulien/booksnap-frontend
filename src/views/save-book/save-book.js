import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from '../../api/openLibrary.js';
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
      // Set timeout to show "not found" message if fetch takes too long
      const timeoutId = setTimeout(() => {
        if (!this.book) {
          this.showNotFound = true;
        }
      }, 10000);

      try {
        const book = await fetchBookByIsbn(isbn);
        const [firstBook] = Object.values(book);
        this.book = firstBook;
        clearTimeout(timeoutId);
      } catch (err) {
        clearTimeout(timeoutId);
        this.showNotFound = true;
      }
    }
  }

  render() {
    return this.book ? this.bookFoundTpl : this.handleBookNotFoundTpl;
  }

  get handleBookNotFoundTpl() {
    if (this.showNotFound) {
      return html`<h2>Book not found</h2>`;
    }
    return html`<spinner-element></spinner-element>`;
  }

  get bookFoundTpl() {
    return html`
      <div class="card">
        <div class="intro-container">
          <h2 class="card-title">Save Book</h2>
          <p>
            Please review the book details and make any necessary corrections.
          </p>
        </div>
        <form @submit=${this.handleFormSubmit}>
          ${this.coverTpl} ${this.formTpl}
          <button-bks type="submit" label="Submit"></button-bks>
        </form>
      </div>
    `;
  }

  get coverTpl() {
    return html`
      <div class="cover-container">
        ${this.book?.cover?.medium
          ? html`<img
              src="${this?.book?.cover?.medium}"
              alt="Book cover"
              class="book-cover"
            />`
          : html`
              <div class="no-cover-container">
                <p class="no-cover">No cover available</p>
              </div>
            `}
        <button-bks
          label="Change Cover"
          @click=${() => this.shadowRoot.getElementById('cover-upload').click()}
        ></button-bks>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          @change=${this.handleCoverChange}
          class="cover-input"
        />
      </div>
    `;
  }

  get formTpl() {
    return html`
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
        .value="${this.book.authors?.map(author => author.name).join(', ') ||
        'Unknown'}"
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
          : this.book.identifiers?.isbn_13 || 'Unknown'}"
        required
      />

      <label for="type">Book type</label>
      <select id="type" name="type" required>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>
      </select>
    `;
  }

  // METHODS

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
        throw new Error('Failed to load cover image');
      }
    }
  }

  // handleFormSubmit(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const bookData = Object.fromEntries(formData.entries());
  //   //console.log('Book data to be saved:', bookData);
  //   // Here you would typically send bookData to your backend or process it further
  // }
}

customElements.define('save-book', SaveBook);
