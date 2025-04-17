import { LitElement, html } from 'lit';
import { displayBook } from './DisplayBook-styles.js';

export class DisplayBook extends LitElement {
  static styles = [displayBook];

  static properties = {
    book: { type: Object },
  };

  firstUpdated() {
    console.log(this.book);
  }

  render() {
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
