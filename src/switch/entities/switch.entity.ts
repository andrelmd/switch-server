import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('switch')
export class Switch {
    @PrimaryColumn({ name: 'id', type: 'varchar', default: () => 'UUID()' })
    id: string

    @Column({ name: 'model', type: 'int4' })
    modelId: number

    @Column({ name: 'device_description', type: 'varchar' })
    deviceDescription: string

    @Column({ name: 'mac_address', type: 'varchar' })
    macAddress: string

    @Column({ name: 'ip_address', type: 'varchar' })
    ipAddress: string

    @Column({ name: 'subnet_mask', type: 'varchar' })
    subnetMask: string

    @Column({ name: 'default_gateway', type: 'varchar' })
    defaultGateway: string

    @Column({ name: 'firmware_version', type: 'varchar' })
    firmwareVersion: string

    @Column({ name: 'hardware_version', type: 'varchar' })
    hardwareVersion: string

    @Column({ name: 'dhcp_on', type: 'boolean' })
    dhcpOn: boolean

    @Column({ name: 'igmp_snooping_on', type: 'boolean' })
    igmpSnoopingOn: boolean

    @Column({ name: 'report_msg_supression_on', type: 'boolean' })
    reportMsgSupressionOn: boolean

    @Column({ name: 'loop_prevention_on', type: 'boolean' })
    loopPreventionOn: boolean

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    updatedAt: Date

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User
}
