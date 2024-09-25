import { IsUUID } from 'class-validator';

export const PAGE = '1' as const;
export const LIMIT = '10' as const;

export class IdentifyParamDto {
  @IsUUID()
  id: string;
}
