import { PortDto } from '../../port/dto/port.dto';
import { Device } from '../entities/device.entity';
export declare class DeviceDto {
    id: number;
    ipAddress: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    ports: Array<PortDto>;
    constructor(device: Device);
}
