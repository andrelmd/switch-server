import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('port_mirror')
export class PortMirror {
  @PrimaryColumn({ name: 'switch_id', type: 'varchar' })
  switchId: string

  @PrimaryColumn({ name: 'port_number', type: 'int4' })
  portNumber: number

  @Column({ name: 'mirrored_port_number', type: 'int4' })
  mirroredPortNumber: number

  @Column({ name: 'ingress_on', type: 'boolean' })
  ingressOn: boolean

  @Column({ name: 'egress_on', type: 'boolean' })
  egressOn: boolean
}
