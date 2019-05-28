<template>
    <div class="filterBox">
        <Row v-for="f in fs" :key="f.english">
            <Col span="4">{{f.chinese}}</Col>
            <Col span="20">
                <div v-if="f.type == '复选框'">
                    <CheckboxGroup :value="getVbyK(f.english, f.type)" @on-change="changeFilter(f.english, $event, f.type)">
                        <Checkbox v-for="option in f.options" :key="option" :label="option">
                        </Checkbox>
                    </CheckboxGroup>
                </div>

                <div v-if="f.type == '范围条'">
                    <Row>
                        <Col span="12">
                             <Slider range :max="f.max / f.rate" :min="f.min / f.rate" :value="getVbyK(f.english, f.type, f.min, f.max, f.rate)" @on-change="changeFilter(f.english, $event, f.type, f.rate)">
                             </Slider>
                        </Col>
                        <Col span="11" :offset="1">
                            <MyInputNumber :max="f.max / f.rate" :min="f.min / f.rate" size="small" :value="getVbyK(f.english, f.type, f.min, f.max, f.rate)" @click="changeFilter(f.english, $event, f.type, f.rate)"/>
                        </Col>
                    </Row>
                </div>

                <div v-if="f.type == '日期范围'">
                    <DatePicker type="daterange" placeholder="请选择购买日期" 
                        :value="getVbyK(f.english, f.type)"
                        @on-change="changeFilter(f.english, $event, f.type)"
                    >
                    </DatePicker>
                </div>
            </Col>
        </Row>

        <br>
        <br>
        <Row>
            <Col span="4">当前：</Col>
            <Col span="20">
                <Tag type="dot" closable color="primary" v-for="item in filters" :key="item.k"
                    @on-close="delTag(item.k)"
                >
                    {{showTagK(item.k)}}：{{showTagV(item.k, item.v)}}
                </Tag>
            </Col>
        </Row>
    </div>
</template>

<script>
    import moment from "moment"
    import filterBox from "../utils/filterBox.js"
    import dictionary from "../utils/dictionary.js"
    import MyInputNumber from './MyInputNumber';
    export default {
        data(){
            return {
                fs: filterBox
            }
        },
        computed: {
            filters(){
                return this.$store.state.largeTableStore.filters
            }
        },
        methods: {
            // 显示k值
            showTagK(e){
                // 根据k，从字典中得到中文的名称
                return dictionary[e]
            },
            // 根据k格式化值
            showTagV(k, v){
                if(k == 'color' || k == 'engine' || k == 'gearbox' || k == 'fuel' || k == 'exhaust' || k == 'brand'){
                    return v.replace(/v/g, ' 或 ')
                }else if(k == 'price'){
                    return v.split('to').map(item=> item + '万元').join(' 到 ')
                }else if(k == 'km'){
                    return v.split('to').map(item=> item / 10000 + '万公里').join(' 到 ')
                }else if(k == 'buydate'){
                    return v.split('to').map(item=> moment(item).format('YYYY年MM月')).join(' 到 ')
                }
            },
            delTag(k){
                // 清空当前所有筛选条件
                this.$store.dispatch('largeTableStore/changeFilter', {k, v:''})
            },
            // 通用函数，通过k得到v值
            getVbyK(k, type, min, max, rate){
                // 遍历state的filters数组，如果数组有k，并且k和data的k相等，则返回数组值
                for(let i = 0;i < this.filters.length;i++){
                    if(this.filters[i].k == k){
                        if(type == '复选框'){
                            return this.filters[i].v.split('v')  //返回数组
                        }else if(type == '范围条'){
                            return this.filters[i].v.split('to').map(item=>{
                                return Math.round(Number(item) / rate)
                            })
                        }else if(type =='日期范围'){
                            // return [new Date(2018, 8,8), new Date(2019, 1,8)]
                            return this.filters[i].v.split('to').map(item=>
                                new Date(Number(item))
                            )
                        }
                    }
                }
                // 如果没有返回空数组
                if(type === '复选框'){
                    return []
                }else if(type === '范围条'){
                    // 返回最小和最大值
                    return [min / rate, max / rate] 
                }else if(type =='日期范围'){
                    return []
                }
            },
            // 复选框筛选条件函数
            changeFilter(k, v, type, rate){
                if(type == '复选框'){
                   v = v.join('v')
                }else if(type =='范围条'){
                   v = v.map(item=>item * rate).join('to')
                }else if(type =='日期范围'){
                   v = v.map(item=>Date.parse(new Date(item))).join('to')
                }
                this.$store.dispatch('largeTableStore/changeFilter', {k, v})
            }
        },
        components: {
            MyInputNumber
        }
    }
</script>

<style scoped>
    .ivu-row{
        height: 32px;
        line-height: 32px;
        font-size:14px;
    }
</style>