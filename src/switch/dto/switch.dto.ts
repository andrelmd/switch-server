import { PortDto } from "../../port/dto/port.dto"
import { Switch } from "../entities/switch.entity"

export class SwitchDto {
    id: number
    ipAddress: string
    username: string
    createdAt: Date
    updatedAt: Date
    ports: Array<PortDto>

    constructor(switchEntity: Switch) {
        this.id = switchEntity.id
        this.ipAddress = switchEntity.ipAddress
        this.username = switchEntity.username
        this.createdAt = switchEntity.createdAt
        this.updatedAt = switchEntity.updatedAt
        switchEntity.ports ? this.ports = switchEntity.ports.map(port => new PortDto(port)) : undefined
    }
}