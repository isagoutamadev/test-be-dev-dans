import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Router, Request, Response } from "express";
import response from "@/helpers/response.helper";
import { SearchCareerSchema } from "@/schemas/career.schema";
import { validate, ReqType } from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import { CareerService } from "./career.service";
import { PagingSchema } from "@/schemas/paging.schema";
import { UUIDSchema } from "@/schemas/global.schema";

export class CareerController implements Controller {
    public path = "careers";
    public router = Router();
    private service = new CareerService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/",
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            validate(SearchCareerSchema, ReqType.QUERY),
            this.get
        );
        
        this.router.get(
            "/:id",
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            this.findById
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { page } = req.query;

            const result = await this.service.get(req.query, Number(page));

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    };
    
    private findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const result = await this.service.findById(id);

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    };
}
