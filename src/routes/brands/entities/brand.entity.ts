import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getDatetime, getUuid } from 'src/utils';


@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: getUuid() })
  uuid: string;

  @ApiProperty()
  @Column({ length: 255 })
  brand: string;

  @Column({ default: getDatetime() })
  createdAt: string;
}
