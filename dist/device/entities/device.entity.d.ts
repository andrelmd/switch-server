import { Port } from '../../port/entities/port.entity';
export declare class Device {
    id: number;
    ipAddress: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    ports: Array<Port>;
}
