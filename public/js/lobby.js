
// Adds each db game to games list on lobby page with unique listing(title, id)
// with button to redirect to each unique game page.
function createGameListing(gameData) {
    return `<div class="games-table">
                <div class="games-row">
                    <div class="games-column"> ${gameData.title} </div>
                    <div class="games-column">0/4</div>
                    <div class="games-column">In Progress</div>
                    <div class="games-column">
                        <div id="activegame${gameData.id}" class="game-listing" data-id="${gameData.id}">Join</div>
                    </div>
                </div>
            </div>`;
}

// Upon loading the /lobby page, page will fetch and display all games from db.
window.addEventListener('DOMContentLoaded', (event) => {
    let gamesListing = document.getElementById('games-container');
    // Retrieves list of games from db from fetch call to /games/list
    fetch(`/games/list`, { method: 'post' })
    .then((response) => response.json())
    .then((results) => {
        let newGamesListing = '';
        for(var i = 0; i < results.length; i++) {
            // Creates HTML template and fills data for each active game listing.
            newGamesListing += createGameListing(results[i]);
        }
        
        // Appends all active games to 'games-container' div in lobby.ejs
        gamesListing.innerHTML = newGamesListing;

        // Adds click event to each created game's Join button
        for(var i = 0; i < results.length; i++) {
            document.querySelector(`#activegame${results[i].id}`)
                    .addEventListener('click', event => {
                        event.preventDefault();
                
                        const { id } = event.target.dataset;
                        console.log(id);
                
                        fetch(`/games/${id}/join`, { method: 'post' })
                        .then((response) => response.json())
                        .then(({ id }) => {
                            if({id}.id != -1) {
                                console.log("Front-end side worked!");
                                window.location.replace(`/games/${id}`);
                            } else {
                                console.log("GAME IS FULL!!! (Front-end)");
                            }
                        })
                        .catch(console.log);
                    });
        }
        return results;
    })
    .catch(console.log);
});