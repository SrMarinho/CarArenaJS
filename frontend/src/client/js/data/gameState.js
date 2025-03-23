import MatchRoom from "../scenes/match_room.js";

export const GameState = Object.freeze({
    MAIN_MENU: "main_menu",
    MATCH_CREATION: "match_creation",
    MATCH_JOIN: "match_join",
    IN_ROOM: "in_room",
    LOBBY: "lobby",
    MATCHMAKING: "matchmaking",
});