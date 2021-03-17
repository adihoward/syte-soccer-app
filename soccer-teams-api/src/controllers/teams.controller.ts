import { NextFunction, Request, Response } from "express"
import { teamsService } from "..";

const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamsService.getAllTeams();
        res.send(teams);
    } catch (err) {
        next(err);
    }
}

export { getAllTeams }