import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    nullable: true,
    maxLength: 100,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  name: string;

  @ApiProperty({
    nullable: true,
    maxLength: 100,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  lastname: string;

  @ApiProperty({
    nullable: false,
    maxLength: 50,
    description: 'Campo Unico',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
  })
  username: string;

  @ApiProperty({
    nullable: true,
    maxLength: 200,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
  })
  email: string;

  @ApiProperty({
    nullable: false,
    maxLength: 100,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @ApiProperty({
    nullable: false,
    default: true,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;
}
