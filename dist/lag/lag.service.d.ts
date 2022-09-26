import { CreateLagDto } from './dto/create-lag.dto';
import { UpdateLagDto } from './dto/update-lag.dto';
export declare class LagService {
    create(createLagDto: CreateLagDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLagDto: UpdateLagDto): string;
    remove(id: number): string;
}
