<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="val => notes = val"></NoteSidebar>
    <div class="note-detail">
      <div v-show="!curNote.id" class="note-empty">请选择笔记</div>
      <div v-show="curNote.id" class="note-detail-ct">
        <div class="note-bar">
          <span>创建日期:{{curNote.createdAtFriendly}}</span>
          <span>更新日期:{{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont" :class="isShowPreview?'icon-edit':'icon-eye'" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:vaule="curNote.title"
                @input="onUpdateNote" @keydown="statusText='正在编辑中...'" placeholder="请输入标题">
        </div>
        <div class="editor">
          <codemirror  v-model="curNote.content" :options="cmOptions" v-show="!isShowPreview" @input="onUpdateNote" @inputRead="statusText='正在输入...'"></codemirror>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
      </div>

  </div>

</template>

<script>

import NoteSidebar from './NoteSidebar'
import _ from 'lodash'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/neat.css'
import MarkdownIt from 'markdown-it'
import {mapGetters,mapActions,mapMutations} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar,codemirror},
  name: 'NoteDetail',
  data() {
    return {
      statusText:'笔记未改动',
      isShowPreview:false,
      cmOptions:{
        tabSize:4,
        mode:'text/c-markdown',
        theme:'neat',
        lineNumber:false,
        line:true,
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  created() {
    this.checkLogin({path:'/login'})

  },

  computed: {
    ...mapGetters([
      'notes',
      'curNote',
      'curBook'
    ]),
    previewContent() {
      return md.render(this.curNote.content || '')
    }
  },

  methods: {
    ...mapMutations([
      'setCurNote',
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote:_.debounce(function() {
      if(!this.curNote.id) return
      this.updateNote({noteId:this.curNote.id, title:this.curNote.title,content:this.curNote.content})
      .then(data => {
        this.statusText = '已保存'
      }).catch(data => {
        this.statusText ='保存出错'
      })

    },3000),

    onDeleteNote() {
      this.deleteNote({noteId:this.curNote.id})
      .then(data => {
        this.$router.replace({path:'/note'})
      })
    },

  },

  beforeRouteUpdate(to, from ,next) {
    this.setCurNote({curNoteId:to.query.noteId})
    next()
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  overflow: hidden;

}

</style>
