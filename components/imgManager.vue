<template>
<el-dialog title="上传" :visible="showImgManager"
    width="45%" top="15vh"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    custom-class="imgManagerDialog"
>
    <button type="button" class="el-dialog__headerbtn" @click="closeDialog()">
        <i class="el-dialog__close el-icon el-icon-close"></i>
    </button>
    <div class="imgManagerUploadWrapper">
        <div class="imgManagerItemBox" @click="openSingleImg" v-loading="isUpload">
            <i class="el-icon-plus"></i>
            <input type="file" ref="singleImg" @change="chooseSingleImg" accept="image/jpg,image/jpeg,image/png,image/gif"/>
        </div>
        <template v-for="(x,index) in itemList">
            <div class="imgManagerItemBox imgManagerItem" :class="{'imgManagerItem_cur':checkIfExist(x)}" :key="index" @click="doSelect(x)">
                <img :src="x"/>
                <div class="mask"><i class="el-icon-circle-check"></i></div>
            </div>
        </template>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="handleImgOK()">确 定</el-button>
    </span>
</el-dialog>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        showImgManager: Boolean,
        limit: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            singleImgUrl: [], //记录已上传的
            isUpload: false,
            selectImgUrl: [], //记录已选择的
            itemList: [
                'http://img.baidu.com/hi/jx2/j_0001.gif',
                'http://img.baidu.com/hi/jx2/j_0002.gif',
                'http://img.baidu.com/hi/jx2/j_0003.gif'
            ]
        }
    },
    methods: {
        closeDialog(){
            if(!this.isUpload){
                this.$emit('close')
            }
        },
        doSelect(url){
            if( this.checkIfExist(url) ){
                this.selectImgUrl.splice(this.selectImgUrl.indexOf(url),1)
            }else{
                if( this.selectImgUrl.length < this.limit ){
                    this.selectImgUrl.push(url)
                }else{
                    this.$alert('此处最多选择'+this.limit+'张图片','温馨提示');
                }
            }
        },
        checkIfExist(url){
            if(this.selectImgUrl.indexOf(url) > -1){
                return true;
            }
            return false;
        },
        openSingleImg(){
            if(!this.isUpload){
                if( this.singleImgUrl.length < this.limit ){
                    this.$refs.singleImg.click()
                }else{
                    this.$alert('此处最多上传'+this.limit+'张图片','温馨提示');
                }
            }
        },
        chooseSingleImg(event){
            if((event.srcElement || event.target).files.length){
                // let singleImg = (event.srcElement || event.target).files[0];
                // let formData = new FormData();
                //     formData.append('imgFiles',singleImg);
                // this.isUpload = true;
                // axios.post('https://www.baidu.com', formData, {
                //     headers: {
                //         'token': 'your token or sth',
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }).then(res => {
                //     this.isUpload = false;
                //     if(res.code==0){
                //         this.singleImgUrl.push(res.data.data)
                //         this.itemList.unshift(res.data.data)
                //     }
                // }).catch(err => {
                //     this.isUpload = false;
                //     this.$alert(err);
                // })
                this.isUpload = true;
                setTimeout(()=>{
                    this.isUpload = false;
                    this.singleImgUrl.push('http://img.baidu.com/hi/youa/y_0034.gif')
                    this.itemList.unshift('http://img.baidu.com/hi/youa/y_0034.gif')
                }, 1000)
            }
        },
        handleImgOK(){
            if(this.selectImgUrl.length){
                this.$emit('doInsert',this.selectImgUrl)
                this.selectImgUrl = []
            }else{
                this.$alert('请先选择图片','温馨提示');
            }
        }
    }
}
</script>
<style lang="scss">
.imgManagerUploadWrapper{
    .imgManagerItemBox{
        display: inline-block;
        margin:0 10px 10px 0;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 98px;
        height: 98px;
        vertical-align: top;
        text-align: center;
        position: relative;
        .el-icon-plus{
            line-height: 98px;
            font-size: 28px;
            color: #8c939d;
            cursor: pointer;
        }
        input{
            display:none;
        }
        img{
            display:block;
            width:100%;
            height:100%;
            border-radius: 6px;
        }
        &.imgManagerItem{
            cursor: pointer;
            border-color:#409EFF;
            .mask{
                display:none;
                position:absolute;top:0;left:0;
                height:100%;
                width:100%;
                border-radius: 6px;
                background:rgba(0,0,0,.5);
                i{
                    line-height: 98px;
                    color:#409EFF;
                    font-size:30px;
                    margin:0 5px;
                    cursor: pointer;
                }
            }
        }
        &.imgManagerItem_cur{
            border-style: solid;
            .mask{
                display:block;
            }
        }
        .el-icon-circle-close{
            position: absolute;right: 0;top: 0;
            z-index: 2;
            font-size:20px;
            color:#f00;
        }
        .uploadImgWrapper{
            width:100%;
            height:100%;
        }
    }
}
.imgManagerDialog{
    .el-dialog__body{
        padding-top:0;
        padding-bottom:0;
    }
}
</style>
