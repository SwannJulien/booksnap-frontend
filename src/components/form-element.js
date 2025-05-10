import { LitElement, css, html } from 'lit';

export class FormElement extends LitElement {
  static styles = css`
    form {
      display: grid;
      grid-template-columns: 25% 75%;
      gap: 1em;
      align-items: center;
    }
  `;

  render() {
    return html`
      <form>
        <slot></slot>
      </form>
    `;
  }
}

customElements.define('form-element', FormElement);
