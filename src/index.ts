import express, { Request, Response } from "express"; // <-- FIX 1: Correct import
import { AppDataSource } from "./data-source";
import { Airport } from "./entity/Airport";

// Establish database connection
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Data Source has been initialized!");

        // Create and setup express app
        const app = express();
        app.use(express.json());

        // Define the API endpoint
        app.get("/api/airport/:iata_code", async (req: Request, res: Response) => { // <-- FIX 2: Added types
            try {
                const iataCode = req.params.iata_code.toUpperCase();
                const airportRepository = AppDataSource.getRepository(Airport);

                const airport = await airportRepository.findOne({
                    where: { iata_code: iataCode },
                    relations: ["city", "city.country"],
                });

                if (!airport) {
                    return res.status(404).json({ message: "Airport not found." });
                }

                const response = {
                    airport: {
                        id: airport.id,
                        icao_code: airport.icao_code,
                        iata_code: airport.iata_code,
                        name: airport.name,
                        type: airport.type,
                        latitude_deg: airport.latitude_deg,
                        longitude_deg: airport.longitude_deg,
                        elevation_ft: airport.elevation_ft,
                        address: {
                            city: airport.city,
                            country: airport.city?.country || null,
                        },
                    },
                };
                
                return res.json(response);

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });

        // Start the express server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });

    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization:", err);
    });