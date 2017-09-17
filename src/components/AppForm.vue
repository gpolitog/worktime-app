<template>
  <section>
    <q-datetime stack-label="Arrived at" v-model="arrived" type="time" />
    <q-datetime stack-label="Lunched at" v-model="lunch" type="time" />
    <q-datetime stack-label="Started second round at" v-model="secondRound" type="time" />

    {{ timechanged }}
  </section>
</template>
<script >
import {
  QDatetime
} from 'quasar'

const newCustomDate = ({ hour, minute, second }) => {
  const date = new Date()
  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(second)
  return date
}

const ARRIVED_HOUR = {hour: 8, minute: 0, second: 0}
const LUNCH_HOUR = {hour: 12, minute: 0, second: 0}
const SECOND_TIME_HOUR = {hour: 13, minute: 0, second: 0}

export default {
  name: 'AppForn',
  components: {
    QDatetime
  },
  data () {
    return {
      arrived: this.arrivedTime,
      lunch: this.lunchTime,
      secondRound: this.secondRoundTime
    }
  },
  props: {
    arrivedTime: {
      default: () => newCustomDate(ARRIVED_HOUR)
    },
    lunchTime: {
      default: () => newCustomDate(LUNCH_HOUR)
    },
    secondRoundTime: {
      default: () => newCustomDate(SECOND_TIME_HOUR)
    }
  },
  computed: {
    timechanged () {
      const times = {
        arrivedTime: this.arrived,
        lunchTime: this.lunch,
        secondRoundTime: this.secondRound
      }
      this.$emit('timechanged', times)
    }
  }
}
</script>