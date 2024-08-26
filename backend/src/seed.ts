import { dataSource } from "./config/db";
import { Country } from "./entities/country";

const seedDatabase = async () => {
  try {
    // Initialize the database connection
    await dataSource.initialize();

    const countryRepository = dataSource.getRepository(Country);

    const countriesData = [
      {
        code: "FR",
        name: "France",
        emoji: "🇫🇷",
      },
      {
        code: "BE",
        name: "Belgique",
        emoji: "🇧🇪",
      },
      {
        code: "AD",
        name: "Andorre",
        emoji: "🇦🇩",
      },
    ];

    for (const countryData of countriesData) {
      const country = countryRepository.create(countryData);
      await countryRepository.save(country);
      console.log(`Country ${country.name} added to the database.`);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await dataSource.destroy();
  }
};

seedDatabase();
