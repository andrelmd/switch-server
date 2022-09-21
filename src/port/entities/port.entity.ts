import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Switch } from "../../switch/entities/switch.entity";

@Entity('ports')
export class Port {
    @PrimaryColumn({ name: 'switch_id', type: 'integer' })
    switchId: number

    @PrimaryColumn({ name: 'number', type: 'integer' })
    number: number

    @Column({ name: 'status_id', type: 'integer', default: () => 0 })
    statusId: number

    @Column({ name: 'speed_id', type: 'integer', default: () => 0 })
    speedId: number

    @Column({ name: 'flow_control_id', type: 'integer', default: () => 0 })
    flowControlId: number

    @ManyToOne(() => Switch)
    @JoinColumn({ name: 'switch_id' })
    switchEntity: Switch
}
