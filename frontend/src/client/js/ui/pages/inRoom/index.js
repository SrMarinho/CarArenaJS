import mainMenu from "./index.html?raw"
import style from "./style.css?raw"
import "../../components/button/index.js";
import { GameState } from "../../../data/gameState.js";

class InRoom extends HTMLElement {
    static get observedAttributes() {
        return ['changeState'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(style);
        this.shadowRoot.adoptedStyleSheets = [sheet];
        this.shadowRoot.innerHTML = mainMenu;
        
        this.setup()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.connectedCallback();
        }
    }

    setup() {
        if (!this.changeState) return;

        const btnMainMenu = this.shadowRoot.querySelector("#btnMainMenu")

        btnMainMenu?.addEventListener("click", () => {
            this.changeState(GameState.MAIN_MENU)
        })
    }
}

customElements.define('in-room', InRoom);
export default InRoom;