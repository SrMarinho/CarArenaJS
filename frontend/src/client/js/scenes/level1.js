import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { setupCameraControls } from "../controllers/cameraController.js";
import { setupCarControls } from "../controllers/carController.js";
import Car from '../objects/Car.js';
import Fence from '../objects/Fence.js';
import { MatchState } from '../data/matchState.js';
import { keys } from '../keyboard.js';

class Level1 {
    constructor(scene, camera, websocket) {
        this.scene = scene;
        this.camera = camera;
        this.websocket = websocket; // Adiciona o WebSocket para comunicação com o servidor
        this.objs = {};
        this.players = []; // Lista de jogadores (incluindo o jogador principal)
        this.carControls = null;
        this.mainCar = null; // Carro principal do jogador
        this.otherPlayers = {}; // Objeto para armazenar outros jogadores conectados
        this.status = MatchState.WAITING
    }

    setup() {
        const loader = new GLTFLoader();
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x7FB800,
            side: THREE.DoubleSide
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.set(Math.PI / 2, 0, 0);
        this.scene.add(floor);

        setupCameraControls(this.camera);

        this.loadMainCar(); // Carrega o carro principal

        loader.load("/models/Fence.glb", (glb) => {
            this.fence = glb.scene;
            this.fence.scale.set(0.1, 0.1, 0.1);
            this.scene.add(this.fence);
        }, undefined, (error) => {
            console.error(error);
        });

        this.camera.position.z = -1;

        // Configura o WebSocket para receber atualizações de outros jogadores
        this.setupWebSocketListeners();
    }

    setupWebSocketListeners() {
        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            switch (data.action) {
                case 'playerJoined':
                    console.log(data);
                    this.addOtherPlayer(data.id, data.position, data.rotation);
                    break;

                case 'playerMoved':
                    this.updateOtherPlayer(data.playerId, data.position, data.rotation);
                    break;

                case 'playerLeft':
                    this.removeOtherPlayer(data.playerId);
                    break;

                case 'startMatch':
                    this.status = MatchState.IN_PROGRESS
                    break;

                default:
                    console.log('Unknown action:', data.action);
            }
        };
    }

    update() {

        this.sendPlayerPosition();

        this.cameraFollowCar();
        switch (this.status) {
            case MatchState.IN_PROGRESS:
                this.matchInProgress()
                break;
            default:
                break;
        }
        if(keys['p']) {
            this.status = MatchState.IN_PROGRESS;
        }
        if(keys['n']) {
            console.log("criando partida");
            this.createMatch()
        }
    }

    matchInProgress() {
        if (this.mainCar) {
            this.carControls.update();
        }

        Object.values(this.otherPlayers).forEach(player => {
            if (player.model) {
                player.model.position.copy(player.position);
                player.model.rotation.copy(player.rotation);
            }
        });
    }

    sendPlayerPosition() {
        if (this.mainCar) {
            const position = this.mainCar.position;
            const rotation = this.mainCar.rotation;

            this.websocket.send(JSON.stringify({
                action: 'playerMoved',
                position: { x: position.x, y: position.y, z: position.z },
                rotation: { x: rotation.x, y: rotation.y, z: rotation.z }
            }));
        }
    }

    cameraFollowCar() {
        if (this.camera && this.mainCar) {
            const radius = 1;
            const height = 1;
            const targetCameraPosition = new THREE.Vector3();
            const smoothness = 0.1;
            let cameraAngle = -this.mainCar.rotation.y - (Math.PI / 2);
            targetCameraPosition.x = this.mainCar.position.x + radius * Math.cos(cameraAngle);
            targetCameraPosition.z = this.mainCar.position.z + radius * Math.sin(cameraAngle);
            targetCameraPosition.y = this.mainCar.position.y + height;
            this.camera.position.lerp(targetCameraPosition, smoothness);
            this.camera.lookAt(this.mainCar.position.clone().add(new THREE.Vector3(0, 0.75, 0)));
        }
    }

    loadMainCar() {
        const car = Car.getInstance();

        car.onLoad((model) => {
            this.mainCar = model; // Define o carro principal
            this.objs.car = model;
            model.position.x = Math.random() * 10;
            model.position.z = Math.random() * 10;
            this.scene.add(model);
            this.carControls = setupCarControls(this.mainCar); // Configura os controles do carro principal

            // Notifica o servidor que o jogador principal entrou na partida
            this.websocket.send(JSON.stringify({
                action: 'playerJoined',
                position: { x: model.position.x, y: model.position.y, z: model.position.z },
                rotation: { x: model.rotation.x, y: model.rotation.y, z: model.rotation.z }
            }));
        });
    }

    addOtherPlayer(playerId, position, rotation) {
        const car = Car.getInstance();
        car.onLoad((model) => {
            model.position.set(position.x, position.y, position.z);
            model.rotation.set(rotation.x, rotation.y, rotation.z);
            this.scene.add(model);

            this.otherPlayers[playerId] = {
                model: model,
                position: new THREE.Vector3(position.x, position.y, position.z),
                rotation: new THREE.Euler(rotation.x, rotation.y, rotation.z)
            };
        });
    }

    updateOtherPlayer(playerId, position, rotation) {
        const player = this.otherPlayers[playerId];
        if (player) {
            player.position.set(position.x, position.y, position.z);
            player.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }

    removeOtherPlayer(playerId) {
        const player = this.otherPlayers[playerId];
        if (player) {
            this.scene.remove(player.model); // Remove o modelo do jogador da cena
            delete this.otherPlayers[playerId]; // Remove o jogador da lista
        }
    }

    createMatch() {
        this.websocket.send(JSON.stringify({
            type: "createMatch"
        }))
    }
}

export default Level1;