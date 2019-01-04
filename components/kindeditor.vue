<template>
<div class="">
    <textarea :id="dynamicId" style="visibility:hidden;" v-model="value"></textarea>
    <img-manager 
        :showImgManager="showImgManager"
        :limit="9"
        @close="showImgManager=false"
        @doInsert="doInsert"
    />
</div>
</template>
<script>
import imgManager from './imgManager'
export default {
    props:{
        value: String,
        imgType: String,
    },
    components:{
        imgManager
    },
    data(){
        return {
            dynamicId: 'editor' + Math.random().toString().slice(-10),
            editor: null,
            showImgManager: false,
        }
    },
    methods:{
        doInsert(url){
            url.forEach(item => {
                this.editor.insertHtml('<img src="'+item+'" style="max-width:95%;height:auto"/>')
            });
            this.showImgManager = false;
        },
        _loadCore(){
            return new Promise((resolve, reject) => {
                if(window.KindEditor){
                    resolve()
                    return
                }
                let coreScript = document.createElement('script')
                    coreScript.type = 'text/javascript'
                    coreScript.src = `/kindeditor/kindeditor-all-min.js`
                document.getElementsByTagName('head')[0].appendChild(coreScript)
                coreScript.onload = function(){
                    if(window.KindEditor){
                        resolve()
                    }else{
                        console.error('加载kindeditor-all-min.js失败!\n', coreScript.src)
                    }
                }
            })
        },
        _registerPlugin(){
            let _this = this
            KindEditor.lang({
                imageMe : '图片',
                indentMe : '首行缩进',
                h3 : '标题',
                blockquote : '引用',
            })
            KindEditor.plugin('imageMe', function(K) {
                var self = this, name = 'imageMe';
                self.clickToolbar(name, function() {
                    _this.showImgManager = true;
                })
            })
            KindEditor.plugin('h3', function(K) {
                var self = this, name = 'h3';
                self.clickToolbar(name, function() {
                    if(self.cmd.commonNode({'h1,h2,h3,h4,h5,h6' : '*'})){
                        self.select().exec('formatblock', 'p')
                    }else{
                        self.select().exec('formatblock', 'h3')
                    }
                })
            })
            KindEditor.plugin('blockquote', function(K) {
                var self = this, name = 'blockquote';
                self.clickToolbar(name, function() {
                    if(self.cmd.commonNode({'blockquote' : '*'})){
                        self.focus().exec('outdent', null);
                    }else{
                        self.focus().exec('indent', null);
                    }
                })
            })
            KindEditor.plugin('indentMe', function(K) {
                var self = this, name = 'indentMe';
                self.clickToolbar(name, function() {
                    var curVal = '', commonNode = self.cmd.commonNode({'*' : '.text-indent'});
                    if (commonNode) {
                        curVal = commonNode.css('text-indent');
                        if(parseInt(curVal)){
                            commonNode.css('text-indent','')
                        }else{
                            if(commonNode[0].nodeName!='BODY' && commonNode[0].className!='ke-content'){
                                commonNode.css('text-indent','2em')
                            }
                        }
                    }
                })
            })
        },
        _initEditor(){
            let _this = this
            this.editor = KindEditor.create('#'+this.dynamicId, {
                basePath: '/kindeditor/',
                width : '100%',
                height : '480px',
                resizeType: 0,
                themeType: 'simple',
                // useContextmenu: false,
                allowImageUpload: false,
                allowFlashUpload: false,
                allowMediaUpload: false,
                allowFileUpload: false,
                allowFileManager: false,
                items: [
                    'source',
                    'undo', 'redo',
                    'bold', 'italic', 'underline', 'strikethrough',
                    // 'formatblock',
                    'h3',
                    'blockquote',
                    'imageMe',
                    'indentMe',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
                    'insertorderedlist', 'insertunorderedlist',
                    'subscript', 'superscript', 'hr', 'link', 'unlink',
                    'quickformat', 'removeformat',
                    'plainpaste',
                    'wordpaste',
                    'fullscreen',
                ],
                afterChange: function(){
                    if(_this.editor){
                        _this.$emit('input',_this.editor.html())
                    }
                },
            })
        }
    },
    mounted(){
        this._loadCore().then(()=>{
            this._registerPlugin()
            this._initEditor()
        }).catch((error)=>{
            console.error(error)
        })
    },
    destroyed() {
        this.editor.remove('#'+this.dynamicId)
    },
    watch:{
        value:{
            handler(value){
                if(this.editor){
                    if(value !== this.editor.html()){
                        this.editor.html(value)
                    }
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss">
.ke-icon-h3,
.ke-icon-blockquote,
.ke-icon-imageMe,
.ke-icon-indentMe{
    width: 16px;
    height: 16px;
}
.ke-icon-h3 {
    background: url('/assets/images/editor_h.png') no-repeat center center!important;
}
.ke-icon-blockquote {
    background: url('/assets/images/editor_blockquote.png') no-repeat center center!important;
}
.ke-icon-imageMe {
    background-position: 0px -496px;
}
.ke-icon-indentMe {
    background-position: 0px -240px;
}
</style>
