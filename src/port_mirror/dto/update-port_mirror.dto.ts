import { PartialType } from '@nestjs/mapped-types';
import { CreatePortMirrorDto } from './create-port_mirror.dto';

export class UpdatePortMirrorDto extends PartialType(CreatePortMirrorDto) {}
