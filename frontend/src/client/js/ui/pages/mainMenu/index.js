import mainMenu from "./index.html?raw"
import style from "./style.css?raw"
import "../../components/button/index.js";

class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets = [sheet];
        this.shadowRoot.innerHTML = mainMenu;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.connectedCallback();
        }
    }
}

customElements.define('main-menu', MainMenu);
export default MainMenu;