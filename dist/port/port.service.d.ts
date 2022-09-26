import { Repository } from 'typeorm';
import { UpdatePortDto } from './dto/update-port.dto';
import { Port } from './entities/port.entity';
export declare class PortService {
    private readonly portsService;
    constructor(portsService: Repository<Port>);
    findAll(deviceId: number): Promise<Port[]>;
    findOne(id: number): string;
    update(updatePortDto: UpdatePortDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
