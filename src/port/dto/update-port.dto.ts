import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdatePortDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  number: number

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  deviceId: number

  @IsNotEmpty()
  @IsNumber()
  statusId?: number

  @IsNotEmpty()
  @IsNumber()
  speedId?: number

  @IsNotEmpty()
  @IsNumber()
  flowControlId?: number
}
