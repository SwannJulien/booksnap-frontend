import { LitElement, html } from 'lit';
import { buttonBks } from './button-bks.css.js';

export class ButtonBks extends LitElement {
  static properties = {
    label: { type: String },
    disabled: { type: Boolean },
  };

  static styles = [buttonBks];

  constructor() {
    super();
    this.label = 'Button';
    this.disabled = false;
  }

  render() {
    return html`
      <button ?disabled=${this.disabled} @click=${this._handleClick}>
        ${this.label}
      </button>
    `;
  }

  _handleClick(e) {
    this.dispatchEvent(
      new CustomEvent('button-click', {
        bubbles: true,
        composed: true,
        detail: { event: e },
      }),
    );
  }
}

customElements.define('button-bks', ButtonBks);
