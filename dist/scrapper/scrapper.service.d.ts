import { Repository } from 'typeorm';
import { Device } from '../device/entities/device.entity';
export declare class ScrapperService {
    private readonly devicesRepository;
    constructor(devicesRepository: Repository<Device>);
    updatePorts(): Promise<void>;
}
