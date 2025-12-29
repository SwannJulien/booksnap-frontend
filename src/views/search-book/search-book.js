import { LitElement, html } from 'lit';
import '../../components/barecode-scanner/barecode-scanner.js';
import '../../components/button-bks/button-bks.js';
import { fetchBookByIsbn } from '../../api/openLibrary.js';
import { searchBook } from './search-book-styles.js';
import { postBook } from '../../api/book.js';
import { sharedStyles } from '../../shared-styles.js';
import '../../components/spinner-element.js';

export class SearchBook extends LitElement {
  static styles = [searchBook, sharedStyles];

  static properties = {
    book: { type: Object },
    isbn: { type: String },
    activeTab: { type: String },
    isModalHidden: { type: Boolean },
    modalType: { type: String },
    modalData: { type: Object },
    coverPreview: { type: String },
    isFormHidden: { type: Boolean },
    showFormNewBook: { type: Boolean },
    isFetching: { type: Boolean },
    showNotFound: { type: Boolean },
    isIsbnTabHidden: { type: Boolean },
    isBarecodeScannerHidden: { type: Boolean },
  };

  constructor() {
    super();
    this.book = null;
    this.isbn = '';
    this.activeTab = 'scan';
    this.isModalHidden = true;
    this.modalType = null;
    this.modalData = null;
    this.isFormHidden = false;
    this.showFormNewBook = false;
    this.isFetching = false;
    this.showNotFound = false;
    this.isIsbnTabHidden = false;
    this.isBarecodeScannerHidden = false;
  }

  render() {
    return html`
      <div class=${this.isModalHidden ? '' : 'blurred'}>
        <div class="tabs">${this.tabsTpl}</div>
        <div class="card">${this.tabContentTpl}</div>
      </div>
      ${this.modalTpl}
    `;
  }

  get tabsTpl() {
    return html`
      <button
        class=${this.activeTab === 'scan' ? 'active' : ''}
        @click=${async () => {
          this.activeTab = 'scan';
          this.showFormNewBook = false;
          this.isBarecodeScannerHidden = false;
          this.isbn = '';
          await this.updateComplete;
        }}
      >
        Scan Barcode
      </button>
      <button
        class=${this.activeTab === 'isbn' ? 'active' : ''}
        @click=${async () => {
          this.activeTab = 'isbn';
          this.showFormNewBook = false;
          this.isIsbnTabHidden = false;
          this.showNotFound = false;
          this.isbn = '';
          await this.updateComplete;
          this.renderRoot?.querySelector('.find-by-isbn-form')?.reset();
        }}
      >
        Enter ISBN
      </button>
      <button
        class=${this.activeTab === 'form' ? 'active' : ''}
        @click=${async () => {
          this.activeTab = 'form';
          this.book = null;
          this.coverPreview = undefined;
          await this.updateComplete;
          this.renderRoot?.querySelector('.create-book-form')?.reset();
        }}
      >
        Fill Form
      </button>
    `;
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
      <h2 class="card-title">
        ${this.showFormNewBook
          ? 'Review the book details and make any necessary corrections before submit'
          : "Scan your book's barecode to get its details automatically"}
      </h2>

      ${this.isFetching
        ? html`<spinner-element></spinner-element>`
        : html` <barecode-scanner
            ?hidden=${this.isBarecodeScannerHidden}
            @sendBarecode=${this.handleIsbnScanAndInput}
          ></barecode-scanner>`}
      ${this.showFormNewBook ? this.newBookForm : ''}
    `;
  }

  get isbnTabTpl() {
    return html`
      <h2 class="card-title">
        ${this.showFormNewBook
          ? 'Review the book details and make any necessary corrections before submit'
          : "Enter your book's ISBN here to get its details automatically"}
      </h2>
      ${this.isFetching
        ? html`<spinner-element></spinner-element>`
        : html`
            <form
              class="find-by-isbn-form"
              ?hidden=${this.isIsbnTabHidden}
              @submit=${this.handleIsbnFormSubmit}
            >
              <input
                type="text"
                id="isbnInput"
                name="isbn"
                .value=${this.isbn}
                placeholder="Enter ISBN here"
                minlength="10"
                maxlength="13"
                pattern="\\d{10}(\\d{3})?"
                required
                @input=${e => {
                  this.isbn = e.target.value;
                }}
              />
              <button-bks
                type="submit"
                label="Submit ISBN"
                ?disabled=${!this.isFormSubmitable('.find-by-isbn-form')}
              ></button-bks>
            </form>
          `}
      ${this.showFormNewBook ? this.newBookForm : ''}
    `;
  }

  get formTabTpl() {
    // TODO: when clicking on the cover preview thumbnail, open it in full screen with a close x
    // like a modal, to be able to see it in bigger if needed.x
    return html`
      <h2 class="card-title">Fill in the book details</h2>
      ${this.newBookForm}
    `;
  }

  get newBookForm() {
    return html`
      ${this.isFetching
        ? html`<spinner-element></spinner-element>`
        : html`
            ${this.coverTpl}
            <form
              class="create-book-form"
              ?hidden=${this.isFormHidden}
              @submit=${this.handleFormSubmit}
            >
              <label for="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                .defaultValue="${this.book?.title || ''}"
                placeholder="Book title"
                pattern="^[A-Za-z0-9\\u00C0-\\u017F\\s\\-:',.!?&amp;()]{1,255}$"
                required
                @input=${() => this.requestUpdate()}
              />

              <label for="author">Author</label>
              <input
                id="author"
                type="text"
                name="author"
                .defaultValue="${this.book?.authors
                  ?.map(author => author.name)
                  .join(', ') || ''}"
                placeholder="Comma separated authors"
                pattern="^[A-Za-z\\u00C0-\\u017F\\s\\-.'(),]{1,500}$"
                required
                @input=${() => this.requestUpdate()}
              />

              <label for="publishingYear">Publish Year</label>
              <input
                id="publishingYear"
                type="number"
                name="publishingYear"
                .defaultValue="${this.book?.publish_date || ''}"
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
                pattern="^[A-Za-z0-9\\u00C0-\\u017F\\s\\-:',.!?&amp;()]{1,255}$"
              />

              <label for="isbn">ISBN</label>
              <input
                id="isbn"
                type="text"
                name="isbn"
                .defaultValue="${this.book?.identifiers?.isbn_10
                  ? this.book?.identifiers?.isbn_10
                  : this.book?.identifiers?.isbn_13 || ''}"
                placeholder="ISBN 10 or ISBN 13"
                minlength="10"
                maxlength="13"
                pattern="\\d{10}(\\d{3})?"
                required
                @input=${() => this.requestUpdate()}
              />

              <label for="isFiction">Book type</label>
              <select
                id="type"
                name="isFiction"
                required
                @input=${() => this.requestUpdate()}
              >
                <option value="" disabled selected hidden>
                  Select book type
                </option>
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
                pattern="^[A-Za-z0-9\\u00C0-\\u017F\\s\\-,.' ]{1,500}$"
              />
              <button-bks
                type="submit"
                label="Submit"
                ?disabled=${!this.isFormSubmitable('.create-book-form')}
              >
              </button-bks>
            </form>
          `}
    `;
  }

  get coverTpl() {
    return html`
      <div class="cover-container">
        ${this.displayCover()}
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

  get modalTpl() {
    return html`
      <div class="modal" ?hidden=${this.isModalHidden}>
        <div class="modal-content">
          <button
            class="close-modal-btn"
            type="button"
            aria-label="Close"
            @click=${this.closeModal}
          >
            &times;
          </button>
          ${this.modalType === 'success'
            ? this.successModalContentTpl
            : this.errorModalContentTpl}
        </div>
      </div>
    `;
  }

  get successModalContentTpl() {
    return html`
      <h2>Book successfully created!</h2>
      <img
        src="data:image/png;base64,${this.modalData?.qrCode}"
        alt="QR Code"
        class="qr-code"
      />
      <button-bks
        class="print-btn"
        label="Print QR Code"
        @click=${this.printQRCode}
      ></button-bks>
    `;
  }

  get errorModalContentTpl() {
    return html`
      <h2>Error</h2>
      <p class="error-message">${this.modalData?.message}</p>
    `;
  }

  // METHODS
  async handleCoverChange(e) {
    const input = e.target;
    const file = input.files && input.files[0];
    if (!file) {
      this.coverPreview = undefined;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.coverPreview = reader.result;
      this.requestUpdate();
    };
    reader.readAsDataURL(file);
  }

  displayCover() {
    if (this.book?.cover?.medium) {
      return html`
        <img
          src="${this.book.cover.medium}"
          alt="Book cover preview"
          class="cover-preview"
        />
      `;
    }
    if (this.coverPreview) {
      return html`
        <img
          src="${this.coverPreview}"
          alt="Book cover preview"
          class="cover-preview"
        />
      `;
    }
    return html`
      <div class="no-cover-container cover-preview">
        <p class="no-cover">No cover available</p>
      </div>
    `;
  }

  isFormSubmitable(selector) {
    const form = this.renderRoot?.querySelector(selector);
    return Boolean(form && form.checkValidity());
  }

  openModal() {
    this.isModalHidden = false;
  }

  closeModal() {
    this.isModalHidden = true;
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = Object.fromEntries(formData.entries());

    if (bookData.author) {
      bookData.author = bookData.author.split(',').map(a => a.trim());
    } else bookData.author = null;
    if (bookData.genres) {
      bookData.genres = bookData.genres.split(',').map(g => g.trim());
    } else bookData.genres = null;
    if (bookData.numberOfPages) {
      bookData.numberOfPages = parseInt(bookData.numberOfPages, 10);
    } else bookData.numberOfPages = null;
    if (bookData.publishingYear) {
      bookData.publishingYear = parseInt(bookData.publishingYear, 10);
    } else bookData.publishingYear = null;
    if (!bookData.publisher) {
      bookData.publisher = null;
    }
    if (bookData.isbn.length === 10) {
      bookData.isbn10 = bookData.isbn;
      delete bookData.isbn;
    } else if (bookData.isbn.length === 13) {
      bookData.isbn13 = bookData.isbn;
      delete bookData.isbn;
    } else this.bookData.isbn = undefined;

    bookData.libraryId = 1; // TODO: replace temporary hardcoded library ID

    const response = await postBook(bookData);
    this.handlePostBookResponse(response);
  }

  handlePostBookResponse(response) {
    if (response.status === 201) {
      this.modalType = 'success';
      this.modalData = response.body;
    } else {
      this.modalType = 'error';
      this.modalData = response.body;
    }
    this.openModal();
  }

  printQRCode() {
    window.print();
  }

  async handleIsbnScanAndInput(e) {
    this.isbn = e.detail.code ? e.detail.code.trim() : this.isbn.trim();
    this.isFetching = true;
    this.isBarecodeScannerHidden = true;
    try {
      const book = await fetchBookByIsbn(this.isbn);
      const [firstBook] = Object.values(book);
      this.book = firstBook;
      this.showFormNewBook = true;
    } catch (err) {
      console.error(err);
    } finally {
      this.isFetching = false;
      this.requestUpdate();
    }
  }

  async handleIsbnFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = Object.fromEntries(formData.entries());
    const { isbn } = bookData;

    this.isFetching = true;
    this.showNotFound = false;
    this.isIsbnTabHidden = true;
    try {
      const book = await fetchBookByIsbn(isbn);
      const [firstBook] = Object.values(book);
      this.book = firstBook;
      this.showFormNewBook = true;
    } catch (err) {
      this.showNotFound = true;
    } finally {
      this.isFetching = false;
      this.requestUpdate();
    }
  }
}

customElements.define('search-book', SearchBook);
