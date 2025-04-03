 class MainMenu extends HTMLElement {
    constructor() {
        super();
        
        // Primeiro precisa criar o shadow root
        this.attachShadow({ mode: 'open' });
        
        // Corrigindo a estrutura HTML (ul>li, não li>ul)
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    padding: 10px;
                    cursor: pointer;
                    background: #f0f0f0;
                    margin-bottom: 5px;
                    border-radius: 4px;
                }
                li:hover {
                    background: #e0e0e0;
                }
            </style>
            <ul>
                <li>Create Room</li>
                <li>Join Room</li>
            </ul>
        `;
    }
}

customElements.define('main-menu', MainMenu);
export default MainMenu