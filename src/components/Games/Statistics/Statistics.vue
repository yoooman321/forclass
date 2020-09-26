<template>
  <div class="statistic"></div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: [
        { name: '①', value: 10 },
        { name: '②', value: 90 },
        { name: '③', value: 5 },
        { name: '④', value: 3 },
        { name: '5', value: 0 }
      ]
    }
  },
  mounted () {
    // const self = this
    const svg = d3.select('.statistic').append('svg').style('width', '60vw').style('height', '35vh').attr('transform', 'translate(20, 20)')
    svg.append('g').attr('text-anchor', 'middle')
    const width = parseInt(d3.select('.statistic').style('width')) - 80
    const height = parseInt(d3.select('.statistic').style('height')) - 80
    // console.log('test: ', parseInt(d3.select('.statistic').style('width')))
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
    }).style('fill', 'red').style('font-size', '20px')
    // add the x Axis
    svg.append('g').attr('transform', 'translate(0,' + (height + 20) + ')').call(d3.axisBottom(x)).style('font-size', '25px').style('padding-top', '10px')
  }
}
</script>
<style scoped>
.statistic {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid black;
  border-radius: 1vh;

}
</style>
