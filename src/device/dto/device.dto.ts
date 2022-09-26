import { PortDto } from '../../port/dto/port.dto';
import { Device } from '../entities/device.entity';

export class DeviceDto {
  id: number;
  ipAddress: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  ports: Array<PortDto>;

  constructor(device: Device) {
    this.id = device.id;
    this.ipAddress = device.ipAddress;
    this.username = device.username;
    this.createdAt = device.createdAt;
    this.updatedAt = device.updatedAt;
    device.ports
      ? (this.ports = device.ports.map((port) => new PortDto(port)))
      : undefined;
  }
}
