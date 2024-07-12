import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;
}
