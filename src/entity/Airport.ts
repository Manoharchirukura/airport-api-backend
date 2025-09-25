import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { City } from "./City";

@Entity()
export class Airport {
    @PrimaryColumn()
    id!: number;

    @Column()
    icao_code!: string;

    @Column()
    iata_code!: string;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column({ type: 'double' })
    latitude_deg!: number;

    @Column({ type: 'double' })
    longitude_deg!: number;

    @Column()
    elevation_ft!: number;
    
    @Column({ nullable: true })
    city_id!: number;

    @ManyToOne(() => City, (city) => city.airports)
    @JoinColumn({ name: "city_id" })
    city!: City;
}