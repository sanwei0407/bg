import React, {Component} from 'react';
import {Tabs} from 'antd';
import config from 'src/commons/config-hoc';
import { PageContent } from 'ra-lib';


const {TabPane} = Tabs;

@config({
    title: '北瓜生成',
    side: true,
    path: '/bg',
})
export default class index extends Component {


  
    render() {
        return (
            <PageContent>

              12312312

            </PageContent>
        );
    }
}
