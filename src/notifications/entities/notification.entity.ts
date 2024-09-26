import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'notifications' })
export class Notification extends CommonEntity {
  @Field()
  @Column()
  public text: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  public user: User;

  @Field()
  @Column({ default: false })
  public isRead: boolean;
}
