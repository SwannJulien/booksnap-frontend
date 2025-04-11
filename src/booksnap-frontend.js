import { LitElement, html } from 'lit';
import { myComponentStyles } from './styles/booksnap-frontend-styles.js';

class BooksnapFrontend extends LitElement {
  static properties = {
    inputText: { type: String },
  };

  constructor() {
    super();
    this.inputText = '';
  }

  static styles = [myComponentStyles];

  handleInputChange(e) {
    this.inputText = e.target.value;
    this.requestUpdate();
  }

  handleButtonClick() {
    const isbn = this.inputText.trim();

    if (!isbn) {
      alert('Please enter an ISBN.');
      return;
    }

    fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.doSomethingWithText(JSON.stringify(data, null, 2));
      })
      .catch(alert('Failed to fetch data. Check the console for details.'));
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

customElements.define('booksnap-frontend', BooksnapFrontend);
