import { Component, AfterContentInit, Output, ViewChild, ElementRef, EventEmitter } from "@angular/core";
import * as d3 from "d3";
import { Article, ArticlesService, CATEGORIES, ViewService } from "../core";
import { BasePortalHost } from "@angular/cdk/portal";

@Component({
  selector: "home-bar-graph",
  templateUrl: "./home.bar.graph.component.html",
  styleUrls: ["./home.bar.graph.component.css"]
})
export class HomeBarGraphComponent implements AfterContentInit {

    @ViewChild("bar-chart") barChart: ElementRef; 
    public width: number;
    public margin = {top: 30, right: 0, bottom: 10, left: 100};
    public data: Article[] = [
        {image: "", name: "", description: "", body: "", category: "", demo: ""}
    ];
    public loader = true;
    public barChartVisible = false;
    private x: d3.ScaleLinear<number, number>;
    private y: d3.ScaleBand<string>;
    private yAxis;
    private colors = ["#f7fbff","#e3eef9","#cfe1f2","#b5d4e9","#93c3df","#6daed5","#4b97c9","#2f7ebc","#1864aa","#0a4a90","#08306b"];

    public selected = {
        name: "Select a bar to learn more", description: "", image: "", body: ""
    };

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService
    ) {
        this.adjustDimensions();
        window.addEventListener("scroll", () => {
            if (this.viewService.isScrolledIntoView("bar-chart") && !this.barChartVisible) {
                this.createBarChart();
            }
        });
        this.colors = this.colors.reverse();
    }

    private adjustDimensions(): void {
        this.width = window.innerWidth - 100 - this.margin.left;

        if (this.width > 1000) {
            this.width = 1000;
        }
    }

    private updateView(): void {
        this.adjustDimensions();
        if (this.viewService.isScrolledIntoView("bar-chart")) {
            this.createBarChart();
        }
    }

    ngAfterContentInit() {
        this.articlesService.findByCategory(CATEGORIES.TECHNOLOGY).subscribe((data) => {
            this.data = data;
            if (this.viewService.isScrolledIntoView("bar-chart")) {
                this.createBarChart();
            }

            window.addEventListener("blur", () => {
                this.updateView();
            });

            window.addEventListener("resize", () => {
                this.updateView();
            });
        });
    }

    public determineHeight(): number {
        if (!this.data) {
            return 0;
        }
        return (this.data.length * 35) + this.margin.top + this.margin.bottom;
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

    private generateRectangles(svg): void {
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
            .attr("data-index", (d, i) => i)
            .attr("fill", (d, i) => this.colors[i])
            .attr("width", d => this.x(d.description) - this.x(0))
            .duration((d, i) => 2000);

        rect.on("mouseover", (element) => {
            let bar = document.getElementById(element.name);
            bar.style.fill = "red";
        }).on("mouseout", (element) => {
            let bar = document.getElementById(element.name);
            let color = this.colors[parseInt(bar.dataset.index, 10)];
            bar.style.fill = color;
        }).on("click", (element) => {
            // this.selected = element;
        });
    }

    private createBarChart(): void {
        if (this.data[0].name === "") {
            return;
        }

        const svg = d3.select("#bar-chart");
        svg.selectAll("*").remove();
        this.barChartVisible = true;
        this.x = this.getXScaleLinear();
        this.y = this.getYScaleLinear();

        svg.attr("width", this.width)
            .attr("height", this.determineHeight());

        // y-axis text
        this.yAxis = (g) => {
            g.attr("transform", `translate(${this.margin.left}, 0)`)
                .style("font-size", "14px")
                .attr("color", "gray")
                .call(d3.axisLeft(this.y).tickSizeOuter(0))
                .selectAll("path")
                    .attr("display", "none");

            g.selectAll("line")
                .attr("display", "none");   
        }

        // actual bars
        this.generateRectangles(svg);

        // text labels in bars
        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .style("font", "14px sans-serif")
            .selectAll("text")
                .data(this.data)
            .enter()
                .append("text")
                    .attr("x", d => 0)
                    .attr("y", d => this.y(d.name) + this.y.bandwidth() / 2)
                .transition()
                    .attr("x", d => this.x(parseInt(d.description, 10)) - 4)
                    .attr("dy", "0.35em")
                    .attr("color", "black")
                    .text(d => d.description)
                    .duration((d, i) => 2000);    
        
        svg.append("g").call(this.yAxis);
    }
}
