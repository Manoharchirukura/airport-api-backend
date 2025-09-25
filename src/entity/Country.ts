import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { City } from "./City";

@Entity()
export class Country {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ length: 2 })
    country_code_two!: string;

    @Column({ length: 3 })
    country_code_three!: string;

    @Column()
    mobile_code!: number;

    @Column()
    continent_id!: number;

    @OneToMany(() => City, (city) => city.country)
    cities!: City[];
}