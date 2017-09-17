import moment from 'moment'

export default {
  data () {
    return {
      notified: false,
      datenow: 0
    }
  },
  mounted () {
    this.clockTime()
  },
  methods: {
    clockTime () {
      const self = this
      this.datenow = this.toSeconds(moment())
      setTimeout(self.clockTime, 1000)
    },
    toSeconds (date) {
      return ((date.hour() * 3600) + (date.minutes() * 60))
    },
    notify () {
      this.sendMessage()
    },
    alertDismissed () {
      this.notified = true
    },
    sendMessage () {
      document.addEventListener('deviceready', startNativeNotifications, false)

      function startNativeNotifications () {
        navigator.vibrate(2000)

        const now = new Date().getTime()
        cordova.plugins.notification.local.schedule({
          text: 'GOGOGOGO',
          at: now,
          led: 'FF0000',
          sound: null
        })

        cordova.plugins.notification.local.on('click', () => {
          navigator.notification.alert(
            'See you tomorrow!',
            this.alertDismissed,
            'Notification disabled!',
            'Ok'
          )
        })
      }
    },
    isTime (time) {
      if (this.notified) return

      if (time <= this.datenow) {
        this.notify()
      }
    }
  }
}
