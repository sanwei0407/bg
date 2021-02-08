
const dayjs =  require('dayjs')
const fs =  require('fs')
const path = require('path')
const chalk = require('chalk')

const base  = {
  name:'User',
  author: 'Dixon',
  date: dayjs(new Date()).format('YYYY-MM-DD hh:mm'),
  beizu: 'try',
  apiurl: '/abc',
}

const modelName = base.name.toLowerCase()+'Model'





// 模板内容 start
const template = `
/*
  @author ${base.author}
  @updateAt ${base.date}
  @beizu ${base.beizu}

*/
import { Inject, Controller, Post, Provide,Body,ALL } from '@midwayjs/decorator';
import { Context } from 'egg';
import { ${base.name} } from '../../entity/${base.name}';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
// dto


@Provide()
@Controller('${base.apiurl}')

export class ${base.name}Controller {

          // 注入
          @Inject()
          ctx: Context;

         // 注入model
          @InjectEntityModel(${base.name})
          ${base.name.toLowerCase()}Model:Repository${'<'+base.name+'>'}

          @Post('/getone')
          async getUser(@Body() uid) {

            if(!uid) return  { success: false, info:'id缺失' }

            const res = await this.${modelName}.findOne(uid);
            return { success:true, data: res }
          }


          async getAll(@Body(ALL) params ){

                let { limit , page, order } = params;
                limit = limit || 20 ;
                page = page || 1;
                order = order || {}
                const skip = (page-1)*limit; //偏移量
                const take = limit; // 返回个数


                let where = {...params} // 初始化查询条件
                if(params.limit) delete where.limit;
                if(params.page) delete where.page;
                if(params.order) delete where.order;



                const [data, count]  = await this.${modelName}.findAndCount({
                  where,
                  take,
                  skip
                })

                return {  success:true, data, count }

          }

          @Post('/add')
          async add(@Body(ALL) params){




              try{
                await this.${modelName}.create({...params})
                return { success:true,info:'添加成功' }
              } catch(e) {
                return { success:false,info:'添加失败' }
              }

          }

          @Post('/update')
          async update(@Body(ALL) params){

               try{
                   const { uid } = params
                   delete params.uid
                   await this.${modelName}.update({
                    ...params
                   },{
                    uid
                   })
                   return { success:true,info:'更新成功' }
                } catch (e) {
                   return { success:false,info:'更新失败' }
                }
          }

          @Post('/delete')
          async delete(@Body() uid:number) {


                try{
                   await this.${modelName}.delete(uid)
                   return { success:true,info:'删除成功' }
                } catch (e) {
                   return { success:false,info:'删除失败' }
                }
          }

}



`
// 模板内容 end




// 生成一个后台的
const apiPath = path.join(__dirname,'./src/controller/api')
// 如果没有就创建一个
if(!fs.existsSync(apiPath))  fs.mkdirSync(apiPath);

// 写入模板内容
fs.openSync(apiPath+"/"+base.name.toLowerCase()+'.ts','w')
fs.writeFileSync(apiPath+"/"+base.name.toLowerCase()+'.ts',template);

console.log(chalk.blue('api写入ok'))


