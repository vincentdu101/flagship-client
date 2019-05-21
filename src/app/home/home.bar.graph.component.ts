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
    margin = {top: 30, right: 0, bottom: 10, left: 50};
    data = [];
    loader = true;
    private x: d3.ScaleLinear<number, number>;
    private y: d3.ScaleBand<string>;
    private xAxis;
    private yAxis;

    constructor() {
        this.determineHeight = this.determineHeight.bind(this);
        this.getXScaleLinear = this.getXScaleLinear.bind(this);
        this.getYScaleLinear = this.getYScaleLinear.bind(this);
        this.createBarChart = this.createBarChart.bind(this);
    }

    ngAfterContentInit() {
        this.data = [
            {year: 1990, count: 1000},
            {year: 2000, count: 1060},
            {year: 2010, count: 2000},
            {year: 2020, count: 6000}
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
                .domain([0, d3.max(this.data, d => d.count)])
                .range([this.margin.left, this.width]);
    }

    private getYScaleLinear(): d3.ScaleBand<string> {
        return d3.scaleBand()
                .domain(this.data.map(d => d.year))
                .range([this.margin.top, this.determineHeight() - this.margin.bottom])
                .padding(0.1);
    }

    private getXAxisHeight() {
        return `translate(0,${this.determineHeight() - this.margin.bottom})`;
    }

    private setupXGridlines(svg) {
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", this.getXAxisHeight())
            .call(d3.axisTop(this.x));
            // .tickFormat(""));
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

        this.yAxis = (g) => g
            .attr("transform", `translate(${this.margin.left}, 0)`)
            .call(d3.axisLeft(this.y).tickSizeOuter(0));

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
                .data(this.data)
            .enter().append("rect")
                .attr("x", this.x(0))
                .attr("y", d => this.y(d.year))
                .attr("width", d => this.x(d.count) - this.x(0))
                .attr("height", this.y.bandwidth());
        
        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .style("font", "12px sans-serif")
            .selectAll("text")
                .data(this.data)
            .enter().append("text")
                .attr("x", d => this.x(d.count) - 4)
                .attr("y", d => this.y(d.year) + this.y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .text(d => d.count);    
        
        svg.append("g").call(this.xAxis);
        svg.append("g").call(this.yAxis);
        this.setupXGridlines(svg);
    }
}
