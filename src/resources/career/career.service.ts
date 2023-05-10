import { Career, SearchCareer } from "@/models/career.model";
import { CareerRepository } from "./career.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class CareerService {
    private repository = new CareerRepository();
    public get = async (search: SearchCareer, page: number): Promise<Career[]> => {
        try {            
            const result = await this.repository.get(search, page);

            return result;
        } catch (error) {
            throw error;
        }
    }
    
    public findById = async (id: string): Promise<Career> => {
        try {            
            const result = await this.repository.findById(id);

            if (!result.id) {
                throw new HttpException("Career not found", ResponseCode.NOT_FOUND);
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}