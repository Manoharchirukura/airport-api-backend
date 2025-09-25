import "reflect-metadata";
import { DataSource } from "typeorm";
import { Airport } from "./entity/Airport";
import { City } from "./entity/City";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite", 
    synchronize: true, 
    logging: false, 
    entities: [Airport, City, Country],
    migrations: [],
    subscribers: [],
});