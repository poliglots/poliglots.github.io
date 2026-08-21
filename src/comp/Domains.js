import { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import json from '../data/domains.json';

// Category colors — kept in sync between chart and panel
const CAT_COLORS = {
    dark:  ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9'],
    light: ['#5470c6', '#91cc75', '#c09c05', '#ee6666', '#2196b5'],
};

// Precompute once at module load (json is a static import)
const nodesByCategory = new Map(json.categories.map((_, i) => [i, []]));
json.nodes.forEach(node => nodesByCategory.get(node.category)?.push(node.name));

export default function Domains({ theme }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const colors = CAT_COLORS[theme] ?? CAT_COLORS.dark;

    useEffect(() => {
        const chart = drawGraph(theme, colors, setActiveCategory);
        const handleResize = () => chart?.resize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [theme]);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="pure-g domains-page">
            <div className="pure-u-1 pure-u-lg-1-2 domains-chart-col">
                <div id="ecDomains" className="domains-chart" />
            </div>
            <div className="pure-u-1 pure-u-lg-1-2 domains-list-col">
                {/* <h2 className="page-title">Domains</h2> */}
                {json.categories.map((cat, i) => {
                    const nodes = nodesByCategory.get(i) ?? [];
                    const color = colors[i];
                    const isActive = activeCategory === i;
                    return (
                        <div
                            key={cat.name}
                            className={`domain-category${isActive ? ' domain-active' : ''}`}
                            style={{ '--cat-color': color }}
                        >
                            <div className="domain-cat-header">
                                <span className="domain-cat-dot" />
                                <span className="domain-cat-name">{cat.name}</span>
                                <span className="domain-cat-count">{nodes.length}</span>
                            </div>
                            <div className="domain-tags">
                                {nodes.map(name => (
                                    <span key={name} className="domain-tag">{name}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function drawGraph(theme, colors, setActiveCategory) {
    const chartDom = document.getElementById('ecDomains');
    echarts.dispose(chartDom);
    const myChart = theme === 'dark'
        ? echarts.init(chartDom, 'dark')
        : echarts.init(chartDom);

    const categoriesWithColor = json.categories.map((c, i) => ({
        ...c,
        itemStyle: { color: colors[i] },
    }));

    myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: params => {
                if (params.dataType === 'node') {
                    const cat = json.categories[params.data.category]?.name ?? '';
                    return `<b>${params.name}</b><br/><span style="opacity:0.7">${cat}</span>`;
                }
                return '';
            },
        },
        legend: [{
            data: json.categories.map(c => c.name),
            top: 40,
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: { fontSize: 11 },
        }],
        series: [{
            type: 'graph',
            layout: 'force',
            data: json.nodes,
            links: json.links,
            categories: categoriesWithColor,
            roam: true,
            draggable: true,
            zoom: 1.5,
            force: {
                repulsion: 160,
                gravity: 0.04,
                edgeLength: [60, 200],
                friction: 0.65,
                layoutAnimation: true,
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle: { width: 2.5, opacity: 1 },
                label: { show: true },
            },
            blur: {
                itemStyle: { opacity: 0.2 },
                lineStyle: { opacity: 0.08 },
            },
            label: {
                show: true,
                fontSize: 10,
                position: 'right',
                formatter: '{b}',
            },
            labelLayout: { hideOverlap: true },
            lineStyle: {
                color: 'source',
                curveness: 0.15,
                opacity: 0.45,
                width: 1,
            },
            itemStyle: {
                borderColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
                borderWidth: 1.5,
            },
            animationDuration: 1500,
            animationEasing: 'cubicOut',
        }],
    });

    myChart.on('mouseover', params => {
        if (params.dataType === 'node') setActiveCategory(params.data.category);
    });
    myChart.on('mouseout', () => setActiveCategory(null));

    return myChart;
}
