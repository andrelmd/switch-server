import { Entity, PrimaryColumn } from "typeorm";

@Entity('lag')
export class Lag {
    @PrimaryColumn({ name: 'switch_id', type: 'varchar' })
    switchId: string

    @PrimaryColumn({ name: 'port_number0', type: 'int4' })
    portNumber0: number

    @PrimaryColumn({ name: 'port_number1', type: 'int4' })
    portNumber1: number

    @PrimaryColumn({ name: 'port_number2', type: 'int4' })
    portNumber2: number

    @PrimaryColumn({ name: 'port_number3', type: 'int4' })
    portNumber3: number
}