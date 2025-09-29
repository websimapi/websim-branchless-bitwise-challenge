export class MultiplayerManager {
    constructor() {
        this.room = new WebsimSocket();
        this.onEntityUpdate = null;
        this.onPlayerUpdate = null;
        this.onPlayerCountUpdate = null;
        this.onScoreUpdate = null;
    }

    initialize = async () => {
        await this.room.initialize();

        this.room.subscribePresence((presence) => {
            const players = Object.entries(presence)
                .filter(([id, data]) => data.x !== undefined && data.y !== undefined)
                .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});

            this.onPlayerUpdate && this.onPlayerUpdate(players);
            this.onPlayerCountUpdate && this.onPlayerCountUpdate(Object.keys(players).length);
        });

        this.room.subscribeRoomState((roomState) => {
            if (roomState.entities && this.onEntityUpdate) {
                this.onEntityUpdate(roomState.entities);
            }
        });

        this.room.onmessage = (event) => {
            const data = event.data;
            if (data.type === 'scoreUpdate' && this.onScoreUpdate) {
                this.onScoreUpdate(data.score);
            }
        };
    };

    updatePlayerPosition = (x, y, health) => {
        this.room.updatePresence({ x, y, health });
    };

    updateEntities = (entities) => {
        this.room.updateRoomState({ entities });
    };

    updateScore = (score) => {
        this.room.send({ type: 'scoreUpdate', score });
    };
}