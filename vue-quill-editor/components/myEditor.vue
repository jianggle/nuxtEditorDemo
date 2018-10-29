<template>
<div class="myEditor">
    <div style="height:360px"
        :content="value"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
        ref="myEditor"
    >
    </div>
    <img-manager 
        :showImgManager="showImgManager"
        @close="showImgManager=false"
        :limit="5"
        @doInsert="doInsert"
    />
</div>
</template>
<script>
import imgManager from './imgManager'
export default {
    components:{
        imgManager
    },
    props:{
        value: String,
        placeholder: {
            type: String,
            default: '请输入...'
        }
    },
    data() {
        return {
            showImgManager: false,
            addRange: null,
            editorOption: {
                placeholder: this.placeholder,
                modules: {
                    toolbar: [
                        "bold", "italic", "underline",
                        "strike",
                        "blockquote",
                        // "link",
                        { color: [] },
                        { background: [] },
                        // { 'font': [] },
                        // { size: [ 'small', false, 'large', 'huge' ]},
                        { header: [1, 2, 3, 4, 5, 6, false] },
                        "image",
                        { align: [] },
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "+1" },
                        { indent: "-1" },
                        { script: "sub" },
                        { script: "super" },
                        "clean"
                    ]
                }
            }
        };
    },
    methods: {
        onEditorBlur(editor) {
            this.$emit('input',this.value)
        },
        onEditorReady(editor) {
            editor.getModule('toolbar').addHandler('image', this.imgHandler)
        },
        onEditorChange({ editor, html, text }) {
            this.$emit('input',html)
        },
        imgHandler(state){
            if(state){
                this.addRange = this.$refs.myEditor.__quill.getSelection()
                this.showImgManager = true
            }
        },
        doInsert(val){
            for(let i=0;i<val.length;i++){
                this.$refs.myEditor.__quill.insertEmbed(this.addRange!==null ? this.addRange.index : 0, 'image', val[i])
                this.$refs.myEditor.__quill.setSelection(this.addRange.index + 1)
            }
            this.showImgManager = false
        }
    }
};
</script>
<style lang="scss">
$hTag: (1,2,3,4,5,6);
.myEditor{
    .ql-snow .ql-picker.ql-header{
        .ql-picker-label::before,
        .ql-picker-item::before{
            content: '段落'!important;
        }
        @each $h in $hTag {
            .ql-picker-label[data-value="#{$h}"]::before,
            .ql-picker-item[data-value="#{$h}"]::before{
                content: '标题#{$h}'!important
            }
        }
    }
}
</style>
