import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity('ports')
export class Port {
  @PrimaryColumn({ name: 'device_id', type: 'integer' })
  deviceId: number;

  @PrimaryColumn({ name: 'number', type: 'integer' })
  number: number;

  @Column({ name: 'status_id', type: 'integer', default: () => 0 })
  statusId: number;

  @Column({ name: 'speed_id', type: 'integer', default: () => 1 })
  speedId: number;

  @Column({ name: 'flow_control_id', type: 'integer', default: () => 0 })
  flowControlId: number;

  @ManyToOne(() => Device)
  @JoinColumn({ name: 'device_id' })
  device?: Device;
}
