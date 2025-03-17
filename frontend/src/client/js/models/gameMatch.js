class GameMatch {
    constructor(id) {
       this.id = id; 
       this.players = []; 
       this.status = "waiting"; 
    }

    playerJoined(player) {
        this.players.push(player)
    }
}