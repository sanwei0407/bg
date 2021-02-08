import { Rule, RuleType } from "@midwayjs/decorator";

export class UserDTO {

  @Rule(RuleType.string().required())
  name: string;

}
