import { Request, Response } from "express-serve-static-core";
import IDistrictUseCase from "../domain/interfaces/IDistrictUseCase";

class DistrictController {
  constructor(private readonly _districtUseCase: IDistrictUseCase) {}

  async getDistricts(req: Request, res: Response) {
    const { select, ...filters } = req.query;

    const projection =
      typeof select === "string"
        ? select.split(",").reduce(
            (acc, field) => {
              acc[field.trim()] = 1;
              return acc;
            },
            {} as Record<string, 1>
          )
        : undefined;

    try {
      const districts = await this._districtUseCase.getAllDistricts({
        filters,
        projection,
      });
      res.status(200).json(districts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching districts", error });
    }
  }
}

export default DistrictController;
