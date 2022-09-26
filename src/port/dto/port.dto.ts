import { Port } from '../entities/port.entity';

export class PortDto {
  switchId: number;
  number: number;
  statusId: number;
  speedId: number;
  flowControlId: number;

  constructor(port: Port) {
    this.switchId = port.deviceId;
    this.number = port.number;
    this.statusId = port.statusId;
    this.speedId = port.speedId;
    this.flowControlId = port.flowControlId;
  }
}
