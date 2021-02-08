import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Userinfo } from "./Userinfo";

import { EntityModel } from "@midwayjs/orm";
@EntityModel("user", { schema: "mw" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "uid" })
  uid: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "pwd", nullable: true, length: 32 })
  pwd: string | null;

  @OneToMany(() => Userinfo, (userinfo) => userinfo.u)
  userinfos: Userinfo[];
}
