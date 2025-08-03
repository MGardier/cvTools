import { OmitType, PickType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class ResetPasswordDto extends PickType(SignUpDto, ['password']) {
  token: string;
}
