import { LitElement, html } from 'lit';
import { homeView } from './home-view-styles.js';

class HomeView extends LitElement {
  static properties = {};

  static styles = [homeView];

  render() {
    return html` 
      <h1>Welcome to BookSnap</h1>
      <nav>
        <a href="/search">Search Book</a></li>
      </nav>
      `;
  }
}

customElements.define('home-view', HomeView);
