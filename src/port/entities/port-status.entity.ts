import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('port_status')
export class PortStatus {
  @PrimaryColumn()
  id: number

  @Column({ name: 'state', type: 'varchar' })
  state: string

  @Column({ name: 'value', type: 'tinyint' })
  value: number
}
