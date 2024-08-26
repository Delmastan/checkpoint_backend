import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";

@InputType()
class CountryInput implements Partial<Country> {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOneOrFail({ where: { code } });
    return country;
  }

  @Mutation(() => Country)
  async createCountry(@Arg("input") input: CountryInput): Promise<Country> {
    const country = Country.create({ ...input });
    await country.save();
    return country;
  }
}
