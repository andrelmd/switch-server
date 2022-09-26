import { Port } from '../entities/port.entity';
export declare class PortDto {
    switchId: number;
    number: number;
    statusId: number;
    speedId: number;
    flowControlId: number;
    constructor(port: Port);
}
