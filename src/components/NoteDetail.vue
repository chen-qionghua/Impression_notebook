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
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:vaule="curNote.title"
                @input="onUpdateNote" @keydown="statusText='正在编辑中...'" placeholder="请输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model:value="curNote.content"
                   @input="onUpdateNote" @keydown="statusText='正在编辑中...'" placeholder="输入内容，支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
      </div>

  </div>

</template>

<script>

import NoteSidebar from './NoteSidebar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapGetters,mapActions,mapMutations} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar},
  name: 'NoteDetail',
  data() {
    return {
      statusText:'笔记未改动',
      isShowPreview:false
    }
  },
  created() {
    this.checkLogin({path:'/login'})

  },

  computed: {
    ...mapGetters([
      'notes',
      'curNote'
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

    },300),

    onDeleteNote() {
      this.deleteNote({noteId:this.curNote})
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
}

</style>
