import { DataSource, Repository } from 'typeorm';
import { Port } from '../port/entities/port.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
export declare class DeviceService {
    private readonly devicessRepository;
    private readonly portsRepository;
    private readonly datasource;
    constructor(devicessRepository: Repository<Device>, portsRepository: Repository<Port>, datasource: DataSource);
    create({ ipAddress, password, username }: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
    findOne(id: number): Promise<Device>;
    update(id: number, updateSwitchDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
