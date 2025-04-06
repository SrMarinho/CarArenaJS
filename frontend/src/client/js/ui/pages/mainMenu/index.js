import mainMenu from "./index.html?raw"
import "../../components/button/index.js";

class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = mainMenu;
    }
}

customElements.define('main-menu', MainMenu);
export default MainMenu;