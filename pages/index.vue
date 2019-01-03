<template>
    <div class="demoWrapper">
        <my-editor v-model="editorContent" placeholder="请输入啦！"/>
        <div class="demoHtml">
            {{editorContent}}
        </div>
    </div>
</template>
<script>
import myEditor from '~/components/myEditor'
export default {
    components: {
        myEditor
    },
    data(){
        return {
            editorContent: ''
        }
    }
}
</script>
<style lang="scss">
.demoWrapper{
    width: 66%;
    margin: 30px;
    .demoHtml{
        word-break: break-all;
    }
}
</style>
