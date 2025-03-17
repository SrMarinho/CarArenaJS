export const MatchState = Object.freeze({
    // Antes da partida
    WAITING: "waiting",
    LOBBY: "lobby",
    COUNTDOWN: "countdown",
    READY: "ready",
    MATCHMAKING: "matchmaking",

    // Durante a partida
    IN_PROGRESS: "in_progress",
    PAUSED: "paused",
    OVERTIME: "overtime",
    SUDDEN_DEATH: "sudden_death",
    INTERMISSION: "intermission",

    // Depois da partida
    FINISHED: "finished",
    CANCELLED: "cancelled",
    ABORTED: "aborted",
    REPLAY: "replay",
    RESULTS: "results",
    REMATCH: "rematch",
});