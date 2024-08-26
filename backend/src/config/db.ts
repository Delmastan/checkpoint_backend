import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./countries.db",
  synchronize: true,
  logging: false,
  entities: ["./src/entities/*.ts"],
});
