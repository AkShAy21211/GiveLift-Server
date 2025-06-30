import { Request, Response } from "express-serve-static-core";
import IDisasterUseCase from "../domain/interfaces/IDisasterUseCase";

class DisasterController {
  constructor(private _disasterUseCase: IDisasterUseCase) {}

  async getAllDisasters(req: Request, res: Response) {

    
    try {
      const queryParams = {
        filters: req.query,
        sort: req.query.sort,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      };
      
      delete queryParams.filters.sort;
      delete queryParams.filters.page;
      delete queryParams.filters.limit;

      const disasters = await this._disasterUseCase.getAll(queryParams);
      res.status(200).json(disasters);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
  async reportDisaster(req: Request, res: Response) {
    const disaster = req.body as any;
    const cookie =req.cookies.currentUser;
    const currentUser = cookie?JSON.parse(cookie):null;

    try {
      const disasterCreated = await this._disasterUseCase.create({
        ...disaster,
        reportedBy: currentUser?._id,
      });
      res.status(201).json(disasterCreated);
    } catch (error:any) {
      console.log(error);
      
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }


  async updateDisaster(req: Request, res: Response) {
    const disaster = req.body as any;
    const disasterId = req.params.id;
    try {
      const disasterUpdated = await this._disasterUseCase.update(
        disasterId,
        disaster
      );
      res.status(200).json(disasterUpdated);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default DisasterController;