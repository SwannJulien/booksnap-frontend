import { LitElement, html } from 'lit';
import { fetchBookByIsbn } from './api/books.js';
import { booksnapAppStyles } from './styles/BooksnapAppStyles.js';

class BooksnapApp extends LitElement {
  static properties = {
    inputText: { type: String },
  };

  constructor() {
    super();
    this.inputText = '';
  }

  static styles = [booksnapAppStyles];

  handleInputChange(e) {
    this.inputText = e.target.value;
    this.requestUpdate();
  }

  async handleButtonClick() {
    const isbn = this.inputText.trim();

    if (!isbn) {
      alert('Please enter an ISBN.');
      return;
    }

    try {
      const data = await fetchBookByIsbn(isbn);
      this.doSomethingWithText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      alert('Failed to fetch data. Check the console for details.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  doSomethingWithText(data) {
    console.log(data);
  }

  render() {
    return html`
      <h1>Hello world!</h1>
      <input
        type="text"
        .value=${this.inputText}
        @input=${this.handleInputChange}
        placeholder="Enter some text..."
      />
      <button @click=${this.handleButtonClick}>Submit</button>
    `;
  }
}

customElements.define('booksnap-app', BooksnapApp);
