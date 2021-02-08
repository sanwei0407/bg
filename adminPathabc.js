
/*
  @author Dixon
  @updateAt 2021-02-08 02:12
  @beizu try

*/
import { Inject, Controller, Post, Provide, Query,Body } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Controller('//abc')

export class AbcController {

          // 注入
          @Inject()
          ctx: Context;

          // 注入model

            @InjectEntityModel(Abc)
            photoModel: Repository<Abc>;


          @Post('/getone')
          async getUser(@Body() id:number) {

            if(!id) return  { success: false, info:'id缺失' }

            const res = await this.Abc.findOne(id);
            return { success:true, data: res }

          }

          async getAll(@Body(all) ){

          }


}



