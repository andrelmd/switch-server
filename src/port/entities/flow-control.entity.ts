import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('flow_control')
export class FlowControl {
  @PrimaryColumn()
  id: number

  @Column({ name: 'flow', type: 'varchar' })
  flow: string

  @Column({ name: 'value', type: 'tinyint' })
  value: number
}
