import { LagService } from './lag.service';
import { CreateLagDto } from './dto/create-lag.dto';
import { UpdateLagDto } from './dto/update-lag.dto';
export declare class LagController {
    private readonly lagService;
    constructor(lagService: LagService);
    create(createLagDto: CreateLagDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLagDto: UpdateLagDto): string;
    remove(id: string): string;
}
