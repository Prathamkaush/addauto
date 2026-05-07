export class CreateUserDto {
  readonly email!: string;
  readonly name!: string;
  readonly role!: 'admin' | 'advertiser';
  readonly password?: string;
}
