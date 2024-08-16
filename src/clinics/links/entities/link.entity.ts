import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { Entity } from 'typeorm';

@ObjectType()
@Entity({ name: "links" })
export class Link extends CommonEntity {
}
