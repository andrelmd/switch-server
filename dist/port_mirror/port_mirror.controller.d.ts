import { PortMirrorService } from './port_mirror.service';
import { CreatePortMirrorDto } from './dto/create-port_mirror.dto';
import { UpdatePortMirrorDto } from './dto/update-port_mirror.dto';
export declare class PortMirrorController {
    private readonly portMirrorService;
    constructor(portMirrorService: PortMirrorService);
    create(createPortMirrorDto: CreatePortMirrorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePortMirrorDto: UpdatePortMirrorDto): string;
    remove(id: string): string;
}
