import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Port } from "../../port/entities/port.entity";

@Entity('switchs')
export class Switch {
    @PrimaryGeneratedColumn('increment', { name: 'id', type: 'integer' })
    id: number

    @Column({ name: 'ip_address', type: 'varchar' })
    ipAddress: string

    @Column({ name: 'username', type: 'varchar' })
    username: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    // @Column({ name: 'model', type: 'integer', nullable: true })
    // modelId?: number

    // @Column({ name: 'device_description', type: 'varchar', nullable: true })
    // deviceDescription?: string

    // @Column({ name: 'mac_address', type: 'varchar', nullable: true })
    // macAddress?: string


    // @Column({ name: 'subnet_mask', type: 'varchar', nullable: true })
    // subnetMask?: string

    // @Column({ name: 'default_gateway', type: 'varchar', nullable: true })
    // defaultGateway?: string

    // @Column({ name: 'firmware_version', type: 'varchar', nullable: true })
    // firmwareVersion?: string

    // @Column({ name: 'hardware_version', type: 'varchar', nullable: true })
    // hardwareVersion?: string


    // @Column({ name: 'dhcp_on', type: 'boolean' })
    // dhcpOn: boolean

    // @Column({ name: 'igmp_snooping_on', type: 'boolean' })
    // igmpSnoopingOn: boolean

    // @Column({ name: 'report_msg_supression_on', type: 'boolean' })
    // reportMsgSupressionOn: boolean

    // @Column({ name: 'loop_prevention_on', type: 'boolean' })
    // loopPreventionOn: boolean

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
    updatedAt: Date

    @OneToMany(() => Port, port => port.switchEntity)
    ports: Array<Port>

    // @OneToOne(() => User)
    // @JoinColumn({ name: 'user_id' })
    // user: User
}
