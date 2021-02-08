
const dayjs =  require('dayjs')

const base  = {
  name:'Abc',
  author: 'Dixon',
  date: dayjs(new Date()).format('YYYY-MM-DD hh:mm'),
  beizu: '',
  apiurl: '',

}





// 模板内容 start
const template = `
/*
  @author ${base.author}
  @updateAt ${base.date}
  @beizu ${base.beizu}

*/
import { Inject, Controller, Post, Provide, Query,Body } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Controller('/${base.apiurl}')

export class ${base.name}Controller {

          // 注入
          @Inject()
          ctx: Context;

          // 注入model

            @InjectEntityModel(${base.name})
            photoModel: Repository${"<"+base.name+">"};


          @Post('/getone')
          async getUser(@Body() id:number) {

            if(!id) return  { success: false, info:'id缺失' }

            const res = await this.${base.name}.findOne(id);
            return { success:true, data: res }

          }

          async getAll(@Body(all) ){

          }


}



`
// 模板内容 end
