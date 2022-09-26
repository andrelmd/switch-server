import { UpdatePortDto } from './dto/update-port.dto';
import { FlowControl } from './enums/flow-control.enum';
import { Speeds } from './enums/speeds.enum';
import { States } from './enums/states.enum';
import { PortService } from './port.service';
export declare class PortController {
    private readonly portService;
    constructor(portService: PortService);
    getFlowControl(): Promise<{
        data: typeof FlowControl;
    }>;
    GetSpeed(): Promise<{
        data: typeof Speeds;
    }>;
    getStates(): Promise<{
        data: typeof States;
    }>;
    findAll(deviceId: string): Promise<{
        data: import("./entities/port.entity").Port[];
    }>;
    update(updatePortDto: UpdatePortDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
