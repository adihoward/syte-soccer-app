import { Team } from './../types/team.type';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, favoriteStateService, fetcherService } from '../index';

interface TeamsState {
    teams: Team[]
}

const initialState = {
    teams: []
} as TeamsState;

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        changeFavorite: (state, action: PayloadAction<string>) => {
            const teamIndex = state.teams.findIndex((team: Team) => team.id === action.payload);

            if (teamIndex !== -1) {
                const currentTeam = state.teams[teamIndex];

                if (currentTeam.isFavorite) {
                    favoriteStateService.removeFavorite(currentTeam.id)
                } else {
                    favoriteStateService.addFavorite(currentTeam.id)
                }

                currentTeam.isFavorite = !currentTeam.isFavorite
            }
        },
        setTeams: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload;
        }
    }
})

export const fetchTeams = (): AppThunk => async dispatch => {
    try {
        const teams = await fetcherService.getTeams();
        const favoriteTeams = favoriteStateService.getFavoriteTeams();

        if (favoriteTeams && favoriteTeams instanceof Array) {
            favoriteTeams.forEach((teamId: string) => {
                const teamIndex = teams.findIndex((team: Team) => team.id === teamId);

                if (teamIndex !== -1) {
                    teams[teamIndex].isFavorite = true;
                }
            });
        }

        dispatch(setTeams(teams));

    } catch (err) {
        console.error('fetch teams thunk error: ' + err);
    }
}

export const { changeFavorite, setTeams } = teamsSlice.actions;
export default teamsSlice.reducer;