import './style.css';
import mediator from '../mediator';

class Marks {
  constructor(id, parent) {
    document.addEventListener("keydown", this.downShiftPlusCtrl, false);
    document.addEventListen("keyup", this.upShiftPlusCtrl, false);

    flag = false;
    this.id = id;
    this.domMark = d3.select(parent);
    const svg = this.domMark.append("svg")
    .style("width", parent.clientWidth)
    .style("height", parent.clientHeight)
    .on("mousedown", this.mousedown);

    const line = d3.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveLinear);

    mediator.on('3d:turn', this.deleteAll.bind(this));
    mediator.on('3d:zoom', this.deleteAll.bind(this));
    mediator.on('3d:pan', this.deleteAll.bind(this));
    mediator.on('marks:add', this.drowNewLine.bind(this));
  }

  downShiftPlusCtrl(e) {
    if (e.shiftKey === true || e.ctrlKey === true)
      flag = true;
  }

  upShiftPlusCtrl(e) {
    if (e.shiftKey === true && e.ctrlKey === true) {
      flag = true;
    }
  }

  deleteAll() {
    if (flag === 0) {
      return -1;
    }

    svg.selectAll("path").remove();
  }

  mousedown() {
    if (flag === true) {
      return -1;
    }

    let myColor = "green"; //Then I'll do it right
    let data = [];
    const path = d3.select(this)
    .append("path")
    .attr("stroke", myColor)
    .attr("stroke-width", 4)
    .attr("fill", "none");

    d3.select(this)
    .on("mousemove", () => {
      data.push(d3.mouse(this));
      let coordinate = d3.mouse(this);

      if (coordinate[0] > width - 5 || coordinate[0] <= 5 || coordinate[1] > height - 5 || coordinate[1] <= 5) {
        path.attr("d", line(data));
        d3.select(this).on("mousemove", null).on("mouseup", null);
        data = [];
        return;
      }

      path.attr("d", line(data));
    })
    .on("mouseup", () => {
      mediator.emit('marks:add', {
        id: this.id,
        line: data,
        color: myColor
      });
      d3.select(this).on("mousemove", null);
      data = [];
    });
  }

  drowNewLine(obj) {
    if (this.id !== obj.id) {
      path.attr("d", obj.line);
    }
  }
}
export default Marks;
