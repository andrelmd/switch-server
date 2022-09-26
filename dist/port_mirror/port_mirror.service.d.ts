import { CreatePortMirrorDto } from './dto/create-port_mirror.dto';
import { UpdatePortMirrorDto } from './dto/update-port_mirror.dto';
export declare class PortMirrorService {
    create(createPortMirrorDto: CreatePortMirrorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePortMirrorDto: UpdatePortMirrorDto): string;
    remove(id: number): string;
}
