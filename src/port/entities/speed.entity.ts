import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('speeds')
export class Speed {
  @PrimaryColumn()
  id: number

  @Column({ name: 'speed', type: 'varchar' })
  speed: string

  @Column({ name: 'value', type: 'tinyint' })
  value: number
}
