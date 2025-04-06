import style from "./style.css?raw";

class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const className = this.getAttribute('class') || '';
        const value = this.getAttribute('value') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                ${style}
            </style>
            <button class="${className}">${value}</button>
        `;
    }

    static get observedAttributes() {
        return ['value', 'class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.connectedCallback();
        }
    }
}

customElements.define('custom-button', Button);
export default Button;