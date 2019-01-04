<template>
    <div style="margin:10px">
        <h3>基于kindetior 4.1.11</h3>
        <kindeditor v-model="content"/>
        {{content}}
    </div>
</template>
<script>
import kindeditor from '~/components/kindeditor'
export default {
    components: {
        kindeditor
    },
    data(){
        return {
            content: '<p>我是默认的内容</p><p>2333...</p><img src="http://img.baidu.com/hi/jx2/j_0001.gif" />',
        }
    }
}
</script>
