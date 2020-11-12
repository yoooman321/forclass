<template>
  <div class="static-part">
    <div class="statistic"></div>
    <div class="fastPlayer">
      <q-card bordered class="bg-orange-6">
        <q-card-section>
          <div style="display: flex; align-items: center;">
            <img style="margin-right: 1vw; height: 5vh;" :src="fantastic">
            最快玩家：{{ playerInfo[0].playerName }}
          </div>
        </q-card-section>
      </q-card>
      </div>
  </div>
</template>
<script>
import fantastic from 'src/assets/fantastic.png'
import * as d3 from 'd3'
export default {
  props: {
    playerInfo: {
      type: Array
    },
    optionAmount: {
      type: Number
    }
  },
  data () {
    return {
      fantastic,
      optionsList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      data: []
    }
  },
  mounted () {
    this.getStudentsAnswer()
    this.drawing()
  },
  methods: {
    getStudentsAnswer () {
      const answerlist = this.playerInfo.reduce((acc, { answer }) => {
        return acc.concat(answer)
      }, [])
      for (let i = 0; i < this.optionAmount; i++) {
        const answerAmount = answerlist.reduce((acc, curr) => {
          if (curr === i) acc++
          return acc
        }, 0)
        this.data[i] = { name: this.optionsList[i], value: answerAmount }
      }
    },
    drawing () {
      // const self = this
      const svg = d3.select('.statistic').append('svg').style('width', '60vw').style('height', '35vh').attr('transform', 'translate(20, 20)')
      svg.append('g').attr('text-anchor', 'middle')
      const width = parseInt(d3.select('.statistic').style('width')) - 80
      const height = parseInt(d3.select('.statistic').style('height')) - 80
      // set the ranges
      const x = d3.scaleBand().range([0, width]).padding(0.6)
      const y = d3.scaleLinear().range([height, 0])
      x.domain(this.data.map(function (d) { return d.name }))
      y.domain([0, d3.max(this.data, function (d) { return d.value })])
      const bars = svg.selectAll('.bar')
        .data(this.data)
        .enter()
        .append('g')
        .attr('transform', 'translate(0, 20)')
      bars.append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) { return x(d.name) })
        .attr('width', x.bandwidth())
        .attr('y', function (d) { return y(d.value) })
        .attr('height', function (d) { return height - y(d.value) })
      bars.append('text').attr('text-anchor', 'middle').text(function (d) {
        return d.value
      }).attr('x', function (d) {
        return x(d.name) + x.bandwidth() / 2
      }).attr('y', function (d) {
        return y(d.value) - 5
      }).style('fill', 'red').style('font-size', '20px').style('font-weight', 'bold')
      // add the x Axis
      svg.append('g').attr('transform', 'translate(0,' + (height + 20) + ')').call(d3.axisBottom(x)).style('font-size', '25px').style('padding-top', '10px')
    }
  }
}
</script>
<style scoped>
.static-part {
  background: white;
}
.statistic {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid black;
  border-radius: 1vh;
}
.fastPlayer {
  text-align: center;
  margin-top: 2vh;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
