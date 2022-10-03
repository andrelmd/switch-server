import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceDto } from './dto/device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createSwitchDto: CreateDeviceDto): Promise<{
        data: DeviceDto;
    }>;
    findAll(): Promise<{
        data: DeviceDto[];
    }>;
    findOne(id: number): Promise<{
        data: DeviceDto;
    }>;
    update(id: string, updateSwitchDto: UpdateDeviceDto): string;
    remove(id: string): string;
}
