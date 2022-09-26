import { Device } from '../../device/entities/device.entity';
export declare class Port {
    deviceId: number;
    number: number;
    statusId: number;
    speedId: number;
    flowControlId: number;
    device?: Device;
}
