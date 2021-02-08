import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

import { EntityModel } from "@midwayjs/orm";
@Index("userinfo_user_uid_fk", ["uid"], {})
@EntityModel("userinfo", { schema: "mw" })
export class Userinfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "uid", nullable: true })
  uid: number | null;

  @Column("char", { name: "key", nullable: true, length: 1 })
  key: string | null;

  @Column("varchar", { name: "value", nullable: true, length: 255 })
  value: string | null;

  @ManyToOne(() => User, (user) => user.userinfos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;
}
