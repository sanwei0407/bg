
/*
  @author Dixon
  @updateAt 2021-02-08 07:59
  @beizu try

*/
import { Inject, Controller, Post, Provide,Body,ALL,RequestIP } from '@midwayjs/decorator';
import { Context } from 'egg';
import { User } from '../../entity/User';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
// dto


@Provide()
@Controller('/abc')


export class UserController {

          // 注入
          @Inject()
          ctx: Context;

         // 注入model
          @InjectEntityModel(User)
          userModel:Repository<User>

          @Post('/getone')
          async getUser(@Body() uid: number,@RequestIP() ip: string) {

            console.log('uid',uid)
            console.log('ip', ip)
            console.log('model',this.userModel)
            if(!uid) return  { success: false, info:'id缺失' }
            const res = await this.userModel.findOne(uid);
            return { success:true, data: res }
          }

          @Post('/findAll')
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



                const [data, count]  = await this.userModel.findAndCount({
                  where,
                  take,
                  skip
                })

                return {  success:true, data, count }

          }

          @Post('/add')
          async add(@Body(ALL) params){
              try{
                await this.userModel.create({...params})
                return { success:true,info:'添加成功' }
              } catch(e) {
                console.dir(e)
                return { success:false,info:'添加失败' }
              }

          }

          @Post('/update')
          async update(@Body(ALL) params){

               try{
                   const { uid } = params
                   delete params.uid
                   await this.userModel.update({
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
                   await this.userModel.delete(uid)
                   return { success:true,info:'删除成功' }
                } catch (e) {
                   return { success:false,info:'删除失败' }
                }
          }

}



