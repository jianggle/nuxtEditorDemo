<template>
    <div class="demoWrapper">
        <quill-editor v-model="content" placeholder="请输入啦！"/>
        <div class="demoHtml">
            {{content}}
        </div>
    </div>
</template>
<script>
import quillEditor from '~/components/quillEditor'
export default {
    components: {
        quillEditor
    },
    data(){
        return {
            content: ''
        }
    }
}
</script>
<style lang="scss">
.demoWrapper{
    margin: 10px;
    .demoHtml{
        word-break: break-all;
    }
}
</style>
