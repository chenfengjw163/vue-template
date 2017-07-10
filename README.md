# 基于Vue2.0 SPA结构的前端开发框架

## 开发文档 （试行版本）

### 框架技术
Vue@2.0 + vue-router + iView + axios

### 目录结构

```nginx
-app                #前端开发目录
---build            #webpack配置文件
---components       #组件目录
------global        #全局注册的公用组件
------[modules]     #业务模块用的组件，在模块下已功能类别划分文件夹，比如filter-select(列表查询组件)、table-cell(单元格组件)，具体组件明明建议以select-[component]、cell-[component]命名
---config           #前端配置文件
---directives       #指令文件夹
---filters          #过滤器
---images           #图片
---pages            #业务代码
-----[modules]      #已业务模块划分文件夹
-------[pages]      #已业务模块中页面划分文件夹
---------index.js   #页面的路由注册入口
-------index.js     #业务模块的路由注册入口
-----app.vue        #最外层组件
-----index.js       #路由注册入口
-----layout.vue     #layout文件和全局样式
---plugins          #插件
---servies          #业务数据获取、数据处理、业务逻辑等
-----[modules]-service
---app.js           #入口文件
---index.html       #模板页
-server #后端开发目录
```

### 代码规范
#### 1.文件、组件命名规范
    1.文件命名小写，使用-分割单词

    2.组件name大驼峰式命名

    3.变量名小驼峰命名

#### 2.页面规范：

template
``` html
<layout-body>
    <layout-filter>
        ...列表筛选区域
        <filter-item :label="">
            ...筛选查询项
            <Input v-model="skn" placeholder=""></Input>
        </filter-item>
    </layout-filter>

    <layout-action>
        ...批量操作区域
        <Button type="error" @click="batchSetOffSale">下架</Button>
    </layout-action>

    <layout-list>
        ...表格列表区域
        <Table></Table>
    </layout-list>
</layout-body>
```

script

``` js
import {SelectBrand, SelectCategory} from 'components/select'; // 建议以{}的形式引入组件
export default {
    data() {
        return {};
    },
    created() { // 需要在页面初始化执行的周期事件

    },
    beforeDestory() { // 需要在页面销毁时执行的周期事件

    },
    methods() {
        xxx() {

        }
    }
    components: {}
}
```

style

lang=scss

``` html
<style lang="scss">
    .list-page {
        float: right;
    }
</style>
```

#### 3.路由规范：
用webpack的code split lazy方式加载页面模块，chunkname为[module].[page]

路由meta元信息:
``` js
{
    pageName: '[页面名称]'
}
```
``` js
export default {
    path: '/onsale.html',
    name: 'onsale',
    component: () => import(/* webpackChunkName: "product.onsale" */'./onsale),
    meta: {
        pageName: '在售商品'
    }
};
```

#### 4.组件划分规范
1.全局公共组件目录为components/global，该文件夹内组件会在Vue实例化前自动注册

2.模块组件在components/[modules]中创建

3.页面级无复用性组件在app/pages/[modules]/[pages]/components文件夹创建

### 开发流程

#### 1.创建页面及入口文件
在apps/pages/[modules]中创建页面文件夹，创建[page].vue及其入口index.js文件，[page].vue为页面业务代码，index.js为入口和路由代码并在[modules]文件夹下的入口文件添加页面的引用。

#### 2.数据获取操作
在页面业务中需要获取数据的逻辑或者需要做数据处理的统一在apps/services下创建service文件处理，涉及到需要调用的接口需要在server/common/api-domain注册：

``` js
// api调用列表
let domainApis = {
    erp: {
        login: '/erp-gateway-web/account/profile/login',
        getPurview: '/erp-gateway-web/account/menu/query_by_pid'
    },
    platform: {
        queryShopsByAdminPid: '/SellerShopController/queryShopsByAdminPid'
    }
};
```
前端调用接口路径为domainApis的属性名，并且加上前缀/Api，例如: '/Api/platform/queryShopsByAdminPid'


#### 3.组件创建
全局组件创建在components/global

业务组件创建在components/[modules]

页面级无复用性组件在app/pages/[modules]/[pages]/components文件夹创建


## CLI
### 项目初始化，执行npm i和生成dll的操作（clone项目之后执行）
```
npm run init
```
### 启动node dev开发模式
```
npm run dev
```
### 启动前端dev开发模式
```
npm run static
```
### 编译静态资源文件
```
npm run build
```
### 代码生成器(生成基础带筛选条件的基础模板页面)
```
npm run code -module=[modulename] -page=[pagename]
```
### 全局js语法检查和css语法检查
```
npm run lint-js
```
```
npm run lint-css
```
