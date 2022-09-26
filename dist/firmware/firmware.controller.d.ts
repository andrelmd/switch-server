import { FirmwareService } from './firmware.service';
import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';
export declare class FirmwareController {
    private readonly firmwareService;
    constructor(firmwareService: FirmwareService);
    create(createFirmwareDto: CreateFirmwareDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFirmwareDto: UpdateFirmwareDto): string;
    remove(id: string): string;
}
