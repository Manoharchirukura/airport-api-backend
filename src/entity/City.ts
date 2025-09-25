import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Country } from "./Country";
import { Airport } from "./Airport";

@Entity()
export class City {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;
    
    @Column({ nullable: true })
    country_id!: number;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @Column({ type: 'double' })
    lat!: number;

    @Column({ type: 'double' })
    long!: number;

    @ManyToOne(() => Country, (country) => country.cities)
    @JoinColumn({ name: "country_id" })
    country!: Country;

    @OneToMany(() => Airport, (airport) => airport.city)
    airports!: Airport[];
}