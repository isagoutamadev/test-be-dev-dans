import { Career, SearchCareer } from "@/models/career.model";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosInstance } from 'axios';

export class CareerRepository {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://dev3.dansmultipro.co.id/api/recruitment',
        });
    }
    
    async get(search: SearchCareer, page: number): Promise<Career[]> {
        try {
            const qParams: any = {
                ...search,
            };

            if (page) {
                qParams.page = page;
            }

            const response = await this.axiosInstance.get<Career[]>("/positions.json", {
                params: qParams
            });

            console.log(response);

            return response.data.filter(item => item !== null);
        } catch (error: any) {
            throw new HttpException("", error.response.status);
        }
    }
    
    async findById(id: string): Promise<Career> {
        try {
            const response = await this.axiosInstance.get<Career>("/positions/" + id);
            
            return response.data;
        } catch (error: any) {
            console.log(error);
            throw new HttpException("", error.response.status);
        }
    }
}