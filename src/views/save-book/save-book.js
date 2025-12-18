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
          <button-bks
            type="submit"
            label="Submit"
            ?disabled=${!this.isFormSubmitable()}
          >
          </button-bks>
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
          class="cover-input"
          type="file"
          accept="image/*"
          @change=${this.handleCoverChange}
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
        placeholder="Book title"
        pattern="^[A-Za-z0-9&#92;s&#92;-:',.!?&amp;&#92;(&#92;)]{1,255}$"
        required
        @input=${() => this.requestUpdate()}
      />

      <label for="author">Author</label>
      <input
        id="author"
        type="text"
        name="author"
        .value="${this.book.authors?.map(author => author.name).join(', ') ||
        'Unknown'}"
        placeholder="Comma separated authors"
        pattern="^[\\p{L}\\p{M}\\s\\-.'\\(\\),]{1,500}$"
        required
        @input=${() => this.requestUpdate()}
      />

      <label for="publishDate">Publish Year</label>
      <input
        id="publishDate"
        type="text"
        name="publishDate"
        .value="${this.book.publish_date || ''}"
        placeholder="e.g., 2021"
        min="1000"
        max="${new Date().getFullYear()}"
      />
      <label for="publisher">Publisher</label>
      <input
        id="publisher"
        type="text"
        name="publisher"
        placeholder="Publisher name"
        pattern="^[&#92;p{L}&#92;p{N}&#92;s&#92;-:',.!?&amp;&#92;(&#92;)]{1,255}$"
      />

      <label for="isbn">ISBN</label>
      <input
        id="isbn"
        type="text"
        name="isbn"
        .value="${this.book.identifiers?.isbn_10
          ? this.book.identifiers?.isbn_10
          : this.book.identifiers?.isbn_13 || 'Unknown'}"
        minlength="10"
        maxlength="13"
        pattern="\\d{10}(\\d{3})?"
        required
        @input=${() => this.requestUpdate()}
      />

      <label for="type">Book type</label>
      <select
        id="type"
        name="type"
        required
        @input=${() => this.requestUpdate()}
      >
        <option value="" disabled selected hidden>Select book type</option>
        <option value="true">Fiction</option>
        <option value="false">Non-fiction</option>
      </select>

      <label for="numberOfPages">Number of pages</label>
      <input
        id="numberOfPages"
        type="number"
        name="numberOfPages"
        placeholder="e.g., 350"
        min="1"
        max="99999"
      />

      <label for="yearRecommendation">Year recommendation</label>
      <select id="yearRecommendation" name="yearRecommendation">
        <option value="" disabled selected hidden>
          Select age recommendation
        </option>
        <option value="pre school">Pre-school</option>
        <option value="1">year 1</option>
        <option value="2">year 2</option>
        <option value="3">year 3</option>
        <option value="4">year 4</option>
        <option value="5">year 5</option>
        <option value="6">year 6</option>
        <option value="7">year 7</option>
        <option value="8">year 8</option>
        <option value="9">year 9</option>
        <option value="10">year 10</option>
        <option value="11">year 11</option>
        <option value="12">year 12</option>
        <option value="13">year 13</option>
      </select>

      <label for="genres">Genres</label>
      <input
        id="genres"
        type="text"
        name="genres"
        placeholder="Comma separated genres"
        pattern="^[\\p{L}\\p{N}\\s\\-',.]{1,500}$"
      />
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

  isFormSubmitable() {
    const form = this.renderRoot?.querySelector('form');
    return Boolean(form && form.checkValidity());
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = Object.fromEntries(formData.entries());
    console.log('Book data to be saved:', bookData);
    // Here you would typically send bookData to your backend or process it further
  }
}

customElements.define('save-book', SaveBook);
