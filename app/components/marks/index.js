import './style.css';
import mediator from '../mediator';

class Marks {
  constructor(width, height, id) {
    addEventListener("keydown", moveRect);
    addEventListener("keyup", moveRect2);

    function moveRect2(e){
      if (e.shiftKey === true || e.ctrlKey === true )
        flag = 0;
    }

    function moveRect(e) {
      if (e.shiftKey === true && e.ctrlKey === true) {
        flag = 1;
      }
    }
    let flag = 0;
    this.id = id;
    this.domMark =  d3.select("div");
    const svg = this.domMark.append("svg")
    .style("width", width)
    .style("height", height)
    .on("mousedown", mousedown);


    const line = d3.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveLinear);

    function mousedown() {
      if (flag === 0) {
        return -1;
      }

      let data = [];
      const path = d3.select(this)
      .append("path")
      .attr("stroke", "green")
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
        mediator.emit('newLine', {
          id: this.id,
          line: data
        });
        d3.select(this).on("mousemove", null);
        data = [];
      });
    }
    mediator.on('newLine', this.drowNewLine.bind(this));
  }

  drowNewLine(obj) {
    if (this.id === obj.id) {
      path.attr("d", obj.line);
    }
  }

}

export default Marks;
