import { LitElement, css, html } from 'lit';

export class FormElement extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
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
