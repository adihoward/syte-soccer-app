import { FakeDbService } from './services/fakeDb.service';
import { TeamsService } from './services/teams.service';
import cors from "cors";
import express, { Response, Request, NextFunction } from "express"
import teamsRouter from './routes/teams.route';
import {config} from 'dotenv';

config();
const app = express()
const fakeDbService = new FakeDbService();
const teamsService = new TeamsService(fakeDbService);

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));
app.get('/', (req, res) => { res.send('Welcome to Soccer Teams API'); });
app.use('/teams', teamsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    console.error(err);
})

app.listen(process.env.PORT, () => {
    console.log(`Soccer API listening at http://localhost:${process.env.PORT}`)
})

export {teamsService};
