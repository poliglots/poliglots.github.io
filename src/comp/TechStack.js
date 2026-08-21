import { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import data from '../data/techstack.json';

export default function TechStack({ theme }) {
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const chart = drawSunburst(theme, setHovered);
        const handleResize = () => chart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return (
        <div className="pure-g techstack-page">
            <div className="pure-u-1 pure-u-lg-1-2 techstack-chart-col">
                <div id="ecTechStack" className="techstack-chart" />
            </div>
            <div className="pure-u-1 pure-u-lg-1-2 techstack-list-col">
                {/* <h2 className="page-title">Tech Stack</h2> */}
                {data.map(category => {
                    const isGrouped = category.children?.some(c => c.children?.length > 0);
                    const color = category.itemStyle?.color ?? 'var(--color-primary)';
                    const isActive = hovered === category.name;

                    return (
                        <div
                            key={category.name}
                            className={`ts-category${isActive ? ' ts-category-active' : ''}`}
                            style={{ '--ts-color': color }}
                        >
                            <div className="ts-category-bar" />
                            <div className="ts-category-body">
                                <h3 className="ts-category-name">{category.name}</h3>
                                {isGrouped ? (
                                    category.children.map(group => (
                                        <div key={group.name} className="ts-group">
                                            <span className="ts-group-label">{group.name}</span>
                                            <div className="ts-tags">
                                                {(group.children ?? []).map(tech => (
                                                    <span key={tech.name} className="ts-tag">{tech.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="ts-tags">
                                        {(category.children ?? []).map(tech => (
                                            <span key={tech.name} className="ts-tag">{tech.name}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function drawSunburst(theme, setHovered) {
    const chartDom = document.getElementById('ecTechStack');
    echarts.dispose(chartDom);
    const myChart = theme === 'dark'
        ? echarts.init(chartDom, 'dark')
        : echarts.init(chartDom);

    myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: params => {
                const path = params.treePathInfo ?? [];
                return path.slice(1).map(n => n.name).join(' › ') || params.name;
            },
        },
        series: {
            type: 'sunburst',
            data,
            radius: ['8%', '82%'],
            sort: undefined,
            emphasis: {
                focus: 'ancestor',
                itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.4)' },
            },
            labelLayout: { hideOverlap: true },
            levels: [
                {},
                {
                    r0: '8%', r: '36%',
                    itemStyle: { borderWidth: 2 },
                    label: { rotate: 'tangential', fontSize: 12, fontWeight: 'bold' },
                },
                {
                    r0: '38%', r: '64%',
                    label: { fontSize: 11 },
                },
                {
                    r0: '66%', r: '82%',
                    label: { fontSize: 10, position: 'inside', padding: 3, silent: false },
                    itemStyle: { borderWidth: 1 },
                },
            ],
            startAngle: window.innerWidth <= 768 ? 45 : 225,
            animationType: 'expansion',
            animationDuration: 1000,
            animationEasing: 'cubicOut',
        },
    });

    myChart.on('mouseover', params => {
        const path = params.treePathInfo ?? [];
        if (path.length >= 2) {
            setHovered(path[1].name);
        }
    });

    myChart.on('mouseout', () => setHovered(null));

    return myChart;
}
