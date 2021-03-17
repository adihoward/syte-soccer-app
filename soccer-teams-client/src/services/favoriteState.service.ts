import { getParsedItem, saveItem } from '../utils/localStorage.util';

const favoriteTeamsKey = "favorites";

export class FavoriteStateService {
    addFavorite(teamId: string) {
        try {
            let favoriteTeams: string[] = getParsedItem(favoriteTeamsKey);

            if (favoriteTeams) {
                favoriteTeams.push(teamId);
            } else {
                favoriteTeams = [teamId];
            }

            saveItem(favoriteTeamsKey, favoriteTeams);
        } catch (err) {
            throw new Error(`Error occured while trying save favorite team to local storage: ${err}`);
        }
    }

    removeFavorite(teamId: string) {
        try {
            let favoriteTeams = getParsedItem(favoriteTeamsKey);

            if (!favoriteTeams) {
                throw new Error("There is no saved favorite in local storage");
            }

            const teamIndex = favoriteTeams.indexOf(teamId);

            if (teamIndex !== -1) {
                favoriteTeams.splice(teamIndex, 1);
            }

            saveItem(favoriteTeamsKey, favoriteTeams);
        } catch (err) {
            throw new Error(`Error occured while trying to remove favorite team from local storage: ${err}`)
        }
    }

    getFavoriteTeams() {
        return getParsedItem(favoriteTeamsKey);
    }
}
