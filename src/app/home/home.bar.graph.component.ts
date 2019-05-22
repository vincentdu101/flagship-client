import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'home-bar-graph',
  templateUrl: './home.bar.graph.component.html',
  styleUrls: ['./home.bar.graph.component.css']
})
export class HomeBarGraphComponent implements AfterContentInit {

    @ViewChild("bar-chart") barChart: ElementRef; 
    width = 900;
    margin = {top: 30, right: 20, bottom: 10, left: 100};
    data = [];
    loader = true;
    private x: d3.ScaleLinear<number, number>;
    private y: d3.ScaleBand<string>;
    private xAxis;
    private yAxis;
    private colorScale;

    constructor() {
        this.determineHeight = this.determineHeight.bind(this);
        this.getXScaleLinear = this.getXScaleLinear.bind(this);
        this.getYScaleLinear = this.getYScaleLinear.bind(this);
        this.createBarChart = this.createBarChart.bind(this);
    }

    ngAfterContentInit() {
        this.data = [
            {name: "TypeScript", description: 1000, body: "blue"},
            {name: "D3", description: 1060, body: "green"},
            {name: "JavaScript", description: 2000, body: "yellow"},
            {name: "Java", description: 6000, body: "black"},
            {name: "Python", description: 1000, body: "red"},
            {name: "Ruby on Rails", description: 1060, body: "orange"},
            {name: "AI", description: 2000, body: "pink"},
            {name: "Unity3D", description: 6000, body: "aqua"},
            {name: "C#", description: 2000, body: "purple"},
            {name: "CSS3", description: 6000, body: "gray"}
        ];
        this.createBarChart();
    }

    public determineHeight(): number {
        if (!this.data) {
            return 0;
        }
        return (this.data.length * 25) + this.margin.top + this.margin.bottom;
    }

    private getXScaleLinear(): d3.ScaleLinear<number, number> {
        return d3.scaleLinear()
                .domain([0, d3.max(this.data, d => d.description + 1000)])
                .range([this.margin.left, this.width]);
    }

    private getYScaleLinear(): d3.ScaleBand<string> {
        return d3.scaleBand()
                .domain(this.data.map(d => d.name))
                .range([this.margin.top, this.determineHeight() - this.margin.bottom])
                .padding(0.1);
    }

    private generateRectangles(svg) {
        let rect = svg.append("g")
            .selectAll("rect")
                .data(this.data)
            .enter().append("rect")
                .style("pointer-events", "all")
                .attr("id", (d) => d.body)
                .attr("width", 0)
                .attr("x", this.x(0))
                .attr("y", d => this.y(d.name))
                .attr("height", this.y.bandwidth());
        
        rect.transition()
            .attr("fill", (d, i) => this.data[i].body)
            .attr("width", d => this.x(d.description) - this.x(0))
            .delay((d, i) => i * 300);

        rect.on("mouseover", (element) => {
            d3.select("#" + element.body).attr("fill", "red");
        }).on("mouseout", (element) => {
            d3.select("#" + element.body)
                .attr("fill", element.body);
        });
    }

    private createBarChart() {
        const svg = d3.select(".bar-chart");

        this.x = this.getXScaleLinear();
        this.y = this.getYScaleLinear();

        svg.attr("width", this.width)
            .attr("height", this.determineHeight());

        this.xAxis = (g) => g
            .attr("transform", `translate(0, ${this.margin.top})`)
            .call(d3.axisTop(this.x).ticks(10))
            .call(g => g.select(".domain").remove());

        this.yAxis = (g) => {
            g.attr("transform", `translate(${this.margin.left}, 0)`)
            .style("font-size", "12px")
            .call(d3.axisLeft(this.y).tickSizeOuter(0))
            .selectAll("path")
                .attr("display", "none");
            g.selectAll("line")
            .attr("display", "none");   
        }

        this.generateRectangles(svg);

        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .style("font", "12px sans-serif")
            .selectAll("text")
                .data(this.data)
            .enter().append("text")
                .attr("x", d => this.x(d.description) - 4)
                .attr("y", d => this.y(d.name) + this.y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .text(d => d.description);    
        
        svg.append("g").call(this.yAxis);
    }
}
