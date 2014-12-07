var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.graph,
  render: function () {
    this.renderWithTemplate(this)

    var fontStyle = {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal'
    }

    var heaterEvents = []

    var band

    this.model.heaterEvents.forEach(function(event) {
      if(event.event == 'ON') {
        if(band) {
          // heater was already on
          return
        }

        band = {
          from: new Date(event.date),
          color: 'rgba(255, 152, 0, 0.1)',
          label: {
            text: 'Heater on',
            style: {
              color: '#606060'
            }
          }
        }
      } else {
        if(!band) {
          // heater was already off
          return
        }

        band.to = new Date(event.date)
        heaterEvents.push(band)
        band = null
      }
    })

    this._chart = new Highcharts.Chart({
      chart: {
        type: "areaspline",
        renderTo: this.query('[data-hook=temperatures]'),
        events: {
          load: function() {
            this.query('[data-hook=temperatures] .highcharts-container').style.width = '100%'
          }.bind(this)
        }
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        type: "datetime",
        labels: {
          overflow: "justify",
          y: 25,
          style: fontStyle
        },
        gridLineWidth: 1,
        plotBands: heaterEvents
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '{value} °C',
          style: fontStyle
        }
      },
      plotOptions: {
        areaspline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          // disabled markers until data interpolation is supported
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          },
          fillOpacity: 0.1
        }
      },
      series: [{
        name: "Temperature",
        data: this.model.temperatures.map(function(temp) {
          return {
            x: new Date(temp.date),
            y: temp.celsius
          }
        })
      }]
    })
  },

  remove: function() {
    View.prototype.remove.call(this)

    if(this._chart) {
      this._chart.destroy()
      this._chart = null
    }
  }
})
