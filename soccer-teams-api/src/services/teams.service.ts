import { Team } from './../types/team.type';
import fs from 'fs/promises';
import { IDb } from "../types/IDb.type";
import path from 'path';

export class TeamsService {
    private dbService: IDb

    constructor(dbService: IDb) {
        this.dbService = dbService;
    }

    getAllTeams = async () => {
        try {
            const teams = await this.dbService.findAll('teams');
            await this.loadTeamsPictures(teams);
            return teams
        } catch (err) {
            throw err;
        }
    }

    private loadTeamsPictures = async (teams: Team[]) => {
        for (const team of teams) {
            try {
                const pictureUri = path.join(process.env.CREST_PICTURES_FOLDER, team.crestFileName);
                team.crestData = await this.loadPictureData(pictureUri);
            } catch (err) {
                console.error(`Load crest picture from ${team.crestFileName} failed: ${err}`)
                team.crestData = null;
            } finally {
                delete team.crestFileName;
            }
        }
    }

    private loadPictureData = async (pictureUri: string) => {
        try {
            return await fs.readFile(pictureUri, { encoding: "base64" });
        } catch (err) {
            throw new Error(`Error occurred while trying to read picture with uri --> ${pictureUri}: ` + err);
        }
    }
}