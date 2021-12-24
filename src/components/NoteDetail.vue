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
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:vaule="curNote.title"
                @input="updateNote" @keydown="statusText='正在编辑中...'" placeholder="请输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model:value="curNote.content"
                   @input="updateNote" @keydown="statusText='正在编辑中...'" placeholder="输入内容，支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
      </div>

  </div>

</template>

<script>

import Auth from '../apis/auth'
import NoteSidebar from './NoteSidebar'
import Bus from '../helpers/bus'
import _ from 'lodash'
import Notes from '../apis/notes'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar},
  name: 'NoteDetail',
  data() {
    return {
      curNote: {},
      notes: [],
      statusText:'笔记未改动',
      isShowPreview:false
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Bus.$once('update:notes',val => {
      this.curNote = val.find(note => note.id === this.$route.query.noteId) || {}
    })
  },

  computed: {
    previewContent() {
      return md.render(this.curNote.content || '')
    }
  },

  methods: {
    updateNote:_.debounce(function() {
      Notes.updateNote({noteId:this.curNote.id},
        {title:this.curNote.title,content:this.curNote.content})
      .then(data => {
        this.statusText = '已保存'
      }).catch(data => {
        this.statusText ='保存出错'
      })

    },300),

    deleteNote() {
      Notes.deleteNote({noteId:this.curNote})
      .then(data => {
        this.$message.success(data.msg)
        this.notes.splice(this.notes.indexOf(this.curNote),1)
        this.$router.replace({path:'/note'})
      })
    },

  },

  beforeRouteUpdate(to, from ,next) {
    console.log('BUG')
    console.log(this.curNote.id)
    this.curNote = this.notes.find(note => note.id === to.query.noteId) || {}
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
