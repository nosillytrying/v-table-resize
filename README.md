## 安装步骤
```
npm install v-table-resize -S

import vTableResize from "v-table-resize"
Vue.use(vTableResize)

```
## 参数配置
| 参数 | 说明 | 类型 | 可选址|默认值 |
| :----:| :----:| :----: |:----: |:----: |
| observerName |  当前组件的name名称| string |无 |无 |
| bottomOffset | 底部el-pagination组件的高度 如果没有改组件 设置值0即可， 值为能够转换数字的值 | number | 无 | 50 |


## 示例
```
    <template>
        <el-table height='0px' 
            ref='elTable'
            v-table-resize="{
            observerName: 'platform-claim-form',
            bottomOffset: 50
            }"
        >
        </el-table>
    </template>
    export default {
        name: 'platform-claim-form'// 路由页组件的名字
    }
    height='0px' 必须设置 为了table能够滚动
    
```

## 如果列表寻在合计功能 需要在合集方法手动调用表格的doLayout方法
```
    <template>
        <el-table height='0px' 
            ref='elTable'
            v-table-resize="{
            observerName: 'platform-claim-form',
            bottomOffset: 50
            }"
            show-summary
            :summary-method="getSummaries"
        >
        </el-table>
    </template>
    export default {
        name: 'platform-claim-form' ,// 路由页组件的名字
        methods: {
            getSummaries () {
                this.$nextTick(() => { // 异步任务
                this.$refs.elTable && this.$refs.elTable.doLayout()
                })
            }
        }
    }
    height='0px' 必须设置 为了table能够滚动
    
```