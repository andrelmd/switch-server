import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('port')
export class Port {
    @PrimaryColumn({ name: 'switch_id', type: 'varchar' })
    switchId: string

    @PrimaryColumn({ name: 'number', type: 'int4' })
    number: number

    @Column({ name: 'status', type: 'int4' })
    statusId: number

    @Column({ name: 'speed', type: 'int4' })
    speedId: number

    @Column({ name: 'flow_control', type: 'int4' })
    flowControlId: number
}
