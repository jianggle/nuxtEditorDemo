<template>
<div>
    <script type="text/plain" :id="dynamicId" :style="editorWrapStyle"></script>
    <img-manager
        :showImgManager="showImgManager"
        @close="showImgManager=false"
        :limit="9"
        @doInsert="doInsert"
    />
</div>
</template>
<script>
import imgManager from './imgManager'
export default {
    props:{
        value: String,
        height: {
            type: String,
            default: '480px'
        }
    },
    components:{
        imgManager
    },
    data(){
        return {
            showImgManager: false,
            dynamicId: 'editor' + Math.random().toString().slice(-10),
            editor: null,
            editorOption: {
                UEDITOR_HOME_URL: '/ueditor/',
                toolbars: [
                    [
                        'source',
                        'undo', 'redo',
                        'bold', 'italic', 'underline', 'strikethrough',
                        'superscript', 'subscript',
                        'h3',
                        'blockquote',
                        'indent',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                        'insertorderedlist', 'insertunorderedlist',
                        'horizontal',
                        'imageme',
                        'link', 'unlink',
                    ]
                ],
                // 编辑器在页面上的z-index层级的基数
                // zIndex: 9999,
                // 启用自动保存
                enableAutoSave: false,
                // 自动同步编辑器要提交的数据
                autoSyncData: false,
                // 粘贴只保留标签，去除标签所有属性
                retainOnlyLabelPasted: true,
                // 是否默认为纯文本粘贴
                pasteplain: true,
                // 纯文本粘贴模式下的过滤规则
                filterTxtRules: function(){
                    function transP(node){
                        node.tagName = 'p';
                        node.setStyle();
                    }
                    return {
                        //直接删除及其字节点内容
                        '-' : 'script style object iframe embed input select',
                        'p': {$:{}},
                        'br':{$:{}},
                        'div':{'$':{}},
                        'li':{'$':{}},
                        'caption':transP,'th':transP,'tr':transP,
                        'h1':transP,'h2':transP,'h3':transP,'h4':transP,'h5':transP,'h6':transP,
                        'td':function(node){
                            //没有内容的td直接删掉
                            var txt = !!node.innerText();
                            if(txt){
                                node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
                            }
                            node.parentNode.removeChild(node,node.innerText())
                        },
                        'img': {
                            $: {
                                src: 1,
                                id: 1
                            }
                        },
                        'blockquote': {$: {}},
                    }
                }(),
                // 有序列表的下拉配置
                insertorderedlist: {
                    'decimal': ''
                },
                // 无序列表的下拉配置
                insertunorderedlist: {
                    'disc': ''
                },
                // 打开右键菜单功能
                enableContextMenu: false,
                // 是否启用元素路径
                elementPathEnabled: false,
                // 是否开启字数统计
                wordCount: false,
                // 是否自动长高
                autoHeightEnabled: false,
                // 是否保持toolbar的位置不动
                autoFloatEnabled: false,
                // 设置远程图片是否抓取到本地保存
                catchRemoteImageEnable: false,
                // 启用图片拉伸缩放
                imageScaleEnabled: false,
                // 图片操作的浮层开关
                imagePopup: false,
            }
        }
    },
    methods: {
        doInsert(url){
            let html = ''
            url.forEach(item => {
                html += '<p><img src="'+item+'" style="max-width:95%;height:auto"/></p>'
            });
            this.editor.execCommand('inserthtml', html)
            this.showImgManager = false
        },
        _loadConfig () {
            return new Promise((resolve, reject) => {
                if(window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0){
                    resolve();
                    return;
                }
                let configScript = document.createElement('script')
                    configScript.type = 'text/javascript'
                    configScript.src = `${this.editorOption.UEDITOR_HOME_URL}ueditor.config.js`
                document.getElementsByTagName('head')[0].appendChild(configScript)
                configScript.onload = function(){
                    if(window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0){
                        resolve();
                    }else{
                        console.error('加载ueditor.config.js失败!\n', configScript.src);
                    }
                };
            });
        },
        _loadCore(){
            return new Promise((resolve, reject) => {
                if(window.UE && window.UE.getEditor){
                    resolve()
                    return
                }
                let coreScript = document.createElement('script')
                    coreScript.type = 'text/javascript'
                    coreScript.src = `${this.editorOption.UEDITOR_HOME_URL}ueditor.all.min.js`
                document.getElementsByTagName('head')[0].appendChild(coreScript)
                coreScript.onload = function(){
                    if(window.UE && window.UE.getEditor){
                        resolve()
                    }else{
                        console.error('加载ueditor.all.min.js失败!\n', coreScript.src)
                    }
                }
            })
        },
        _checkDependencies(){
            return new Promise((resolve, reject) => {
                let scriptsLoaded = !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor;
                if(scriptsLoaded){
                    resolve()
                }else{
                    this._loadConfig().then(() => this._loadCore()).then(() => {
                        resolve()
                    })
                }
            })
        },
        registerBtn(){
            let _this = this;
            UE.registerUI('imageme', function(editor, uiName) {
                var btn = new UE.ui.Button({
                    name: uiName,
                    title: '图片',
                    cssRules: 'background-position: -380px 0;',
                    onclick: function() {
                        _this.showImgManager = true;
                    }
                });
                return btn;
            });
            UE.registerUI('h3', function(editor, uiName) {
                var btn = new UE.ui.Button({
                    name: uiName,
                    title: '标题',
                    cssRules: '',
                    onclick: function() {
                        var value = editor.queryCommandValue("Paragraph");
                        editor.execCommand('Paragraph', value=='h3' ? 'p' : 'h3');
                    }
                });
                editor.addListener('selectionchange', function() {
                    var state = editor.queryCommandState(uiName);
                    var value = editor.queryCommandValue("Paragraph");
                    if (state == -1) {
                        btn.setDisabled(true);
                        btn.setChecked(false);
                    } else {
                        btn.setDisabled(false);
                        btn.setChecked(value=='h3');
                    }
                });
                return btn;
            });
        },
        _initEditor(){
            this.registerBtn()
            this.editor = UE.getEditor(this.dynamicId, this.editorOption)
            this.editor.ready(()=>{
                this.editor.setContent(this.value)
            })
            this.editor.addListener('contentChange', ()=>{
                this.$emit('input', this.editor.getContent())
            })
        }
    },
    computed: {
        editorWrapStyle(){
            return {
                width: '100%',
                height: this.height
            }
        }
    },
    mounted(){
        this._checkDependencies().then(()=>{
            this._initEditor()
        }).catch((error)=>{
            console.error('编辑器加载失败')
        })
    },
    destroyed(){
        this.editor && this.editor.destroy()
    },
    watch:{
        value:{
            handler(value){
                if(this.editor){
                    if(value !== this.editor.getContent()){
                        this.editor.setContent(value)
                    }
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss">
.edui-default .edui-for-h3 .edui-icon {
	background-image: none !important;
	&::before {
		content: 'H';
		line-height: 20px;
		display: inline-block;
		width: 100%;
		text-align: center;
		font-weight: bold;
		color: #444;
	}
}
</style>
