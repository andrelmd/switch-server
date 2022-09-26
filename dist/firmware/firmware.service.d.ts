import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';
export declare class FirmwareService {
    create(createFirmwareDto: CreateFirmwareDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFirmwareDto: UpdateFirmwareDto): string;
    remove(id: number): string;
}
