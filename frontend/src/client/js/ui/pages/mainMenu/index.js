import mainMenu from "./index.html?raw"
import style from "./style.css?raw"
import "../../components/button/index.js";
import { GameState } from "../../../data/gameState.js";

class MainMenu extends HTMLElement {
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
        
        this.setup();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.connectedCallback();
        }
    }

    setup() {
        const btnCreateRoom = this.shadowRoot.querySelector("#btnCreateRoom")
        const btnJoinRoom = this.shadowRoot.querySelector("#btnJoinRoom")

        btnCreateRoom?.addEventListener("click", () => {
            this.changeState(GameState.IN_ROOM)
        })

        btnJoinRoom?.addEventListener("click", () => {
            this.changeState(GameState.MATCH_JOIN)
        })
    }
}

customElements.define('main-menu', MainMenu);
export default MainMenu;