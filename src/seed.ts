import { AppDataSource } from "./data-source";
import { Country } from "./entity/Country";
import { City } from "./entity/City";
import { Airport } from "./entity/Airport";
import * as fs from "fs";
import * as path from "path";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const countryRepo = AppDataSource.getRepository(Country);
    const cityRepo = AppDataSource.getRepository(City);
    const airportRepo = AppDataSource.getRepository(Airport);

    await airportRepo.query('DELETE FROM airport;');
    await cityRepo.query('DELETE FROM city;');
    await countryRepo.query('DELETE FROM country;');
    console.log("Cleared old data.");

    const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/countries.json'), 'utf8'));
    const citiesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/cities.json'), 'utf8'));
    const airportsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/airports.json'), 'utf8'));
    
    await countryRepo.save(countriesData);
    console.log("Loaded countries.");

    await cityRepo.save(citiesData);
    console.log("Loaded cities.");
    
    await airportRepo.save(airportsData);
    console.log("Loaded airports.");

    console.log("✅ Database has been seeded successfully!");

  } catch (error) {
    console.error("❌ Error during database seeding:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("Data Source has been closed!");
    }
  }
}

seedDatabase();