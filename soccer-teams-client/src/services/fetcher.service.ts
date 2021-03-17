import { AxiosInstance } from "axios";
import { Team } from "../types/team.type";
import { AxiosInstanceService } from "./axiosInstance.service";

export class FetcherService {
    private axios: AxiosInstance;

    constructor(baseUrl: string | undefined) {
        if (!baseUrl) {
            throw new Error('SERVER_BASE_URL envrionment variable is undefined');
        }

        let axiosService = new AxiosInstanceService(baseUrl);
        this.axios = axiosService.getAxiosInstance();
    }

    getTeams = async (): Promise<Team[]> => {
        const response = await this.axios.get('/teams');
        return response.data
    }
}