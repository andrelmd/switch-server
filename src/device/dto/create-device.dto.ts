import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  ipAddress: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
