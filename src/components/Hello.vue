<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
<!--     <q-toolbar slot="header" class="glossy">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
      Worktime
      </q-toolbar-title>
    </q-toolbar> -->

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Settings</q-list-header>
        <q-item @click="launch('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <div class="layout-padding non-selectable">
      <h1 class="title">Work<span class="attention">Time</span></h1>
      <app-form
        @timechanged="calculate"></app-form>

      <get-out-time 
        :time="times.getOutTime"></get-out-time>

      <!-- <notification-clock :getOutTime="getOutTimeInSeconds"></notification-clock> -->
    </div>
  </q-layout>
</template>

<script>
import moment from 'moment'

import AppForm from './AppForm'
import GetOutTime from './GetOutTime'
import notificationMixin from './NotificationMixin'
// import NotificationClock from './NotificationClock'
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  name: 'index',
  mixins: [notificationMixin],
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    AppForm,
    GetOutTime
    // NotificationClock
  },
  data () {
    return {
      totalWorkHours: 8 * 60 * 60, // 8 hours
      times: {
        arrivedTime: '',
        lunchTime: '',
        secondRoundTime: '',
        getOutTime: ''
      },
      getOutTimeInSeconds: 1 // must be one, otherwise show notify on load
    }
  },
  methods: {
    calculate (changedTimes) {
      this.times = Object.assign(this.times, changedTimes)
      const arrived = this.toSeconds(
        this.toMilliSeconds(this.times.arrivedTime)
      )
      const lunchTime = this.toSeconds(
        this.toMilliSeconds(this.times.lunchTime)
      )
      const secondRound = this.toSeconds(
        this.toMilliSeconds(this.times.secondRoundTime)
      )
      const totalLunchTime = (secondRound - lunchTime)
      this.getOutTimeInSeconds = arrived + this.totalWorkHours + totalLunchTime
      this.times.getOutTime = new Date(this.getOutTimeInSeconds * 1000).toISOString().substr(11, 8)

      this.isTime(this.getOutTimeInSeconds)
    },
    toMilliSeconds (date) {
      return moment(date, 'h:mm')
    },
    toSeconds (date) {
      return ((date.hour() * 3600) + (date.minutes() * 60))
    }
  }
}
</script>

<style lang="stylus">
.title
  margin-top: 50px
  text-align: center
  font-size: 2.5em
  color: #999

.attention
  color: #465C90
</style>
