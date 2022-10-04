import { PartialType } from '@nestjs/mapped-types'
import { CreateLagDto } from './create-lag.dto'

export class UpdateLagDto extends PartialType(CreateLagDto) {}
