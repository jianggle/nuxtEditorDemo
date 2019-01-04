<template>
    <div class="ueditor_demo">
        <h3>基于ueditor1_4_3_3-utf8-php</h3>
        <div class="demo_item">
            <ueditor v-model="content" style="width:50%;"/>
            <div class="htmlview">
                {{content}}
            </div>
        </div>
    </div>
</template>
<script>
import ueditor from '~/components/ueditor'
export default {
    components: {
        ueditor
    },
    data(){
        return {
            content: '<p>我是默认的内容</p><p>2333...</p>',
        }
    }
}
</script>
<style lang="scss">
.ueditor_demo{
    width: 90%;
    margin: 10px auto;
    .demo_item{
        display: flex;
    }
    .htmlview{
        flex: 1;
    }
}
</style>
