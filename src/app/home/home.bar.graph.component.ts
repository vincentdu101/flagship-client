import { Component, AfterContentInit, Output, ViewChild, ElementRef, EventEmitter } from "@angular/core";
import * as d3 from "d3";
import { Article, ArticlesService, CATEGORIES } from "../core";

@Component({
  selector: "home-bar-graph",
  templateUrl: "./home.bar.graph.component.html",
  styleUrls: ["./home.bar.graph.component.css"]
})
export class HomeBarGraphComponent implements AfterContentInit {

    @ViewChild("bar-chart") barChart: ElementRef; 
    public width = 900;
    public margin = {top: 30, right: 20, bottom: 10, left: 100};
    public data: Article[] = [];
    public loader = true;
    private x: d3.ScaleLinear<number, number>;
    private y: d3.ScaleBand<string>;
    private yAxis;
    public selected = {
        name: "Select a bar to learn more", description: ""
    };

    constructor(private articlesService: ArticlesService) {
        this.determineHeight = this.determineHeight.bind(this);
        this.getXScaleLinear = this.getXScaleLinear.bind(this);
        this.getYScaleLinear = this.getYScaleLinear.bind(this);
        this.createBarChart = this.createBarChart.bind(this);
    }

    ngAfterContentInit() {
        this.articlesService.findByCategory(CATEGORIES.TECHNOLOGY).subscribe((data) => {
            this.data = data;
            this.createBarChart();
        });
    }

    public determineHeight(): number {
        if (!this.data) {
            return 0;
        }
        return (this.data.length * 25) + this.margin.top + this.margin.bottom;
    }

    private getXScaleLinear(): d3.ScaleLinear<number, number> {
        return d3.scaleLinear()
                .domain([0, d3.max(this.data, d => parseInt(d.description, 10))])
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
                .attr("id", (d) => d.name)
                .attr("width", 0)
                .attr("x", this.x(0))
                .attr("y", d => this.y(d.name))
                .attr("height", this.y.bandwidth());
        
        rect.transition()
            .attr("fill", (d, i) => this.data[i].body)
            .attr("width", d => this.x(d.description) - this.x(0))
            .delay((d, i) => i * 300);

        rect.on("mouseover", (element) => {
            d3.select("#" + element.name).attr("fill", "red");
        }).on("mouseout", (element) => {
            d3.select("#" + element.name)
                .attr("fill", element.body);
        }).on("click", (element) => {
            this.selected = element;
        });
    }

    private createBarChart() {
        const svg = d3.select(".bar-chart");

        this.x = this.getXScaleLinear();
        this.y = this.getYScaleLinear();

        svg.attr("width", this.width)
            .attr("height", this.determineHeight());

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
                .attr("x", d => this.x(parseInt(d.description, 10)) - 4)
                .attr("y", d => this.y(d.name) + this.y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .text(d => d.description);    
        
        svg.append("g").call(this.yAxis);
    }
}
