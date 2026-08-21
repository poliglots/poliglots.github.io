import { useEffect } from 'react';
import * as echarts from 'echarts';

const skills = [
    {
        category: 'Architecture',
        score: 88,
        techs: ['System Design', 'ADR', 'API Design', 'Event-Driven', 'DDD', 'RFC'],
    },
    {
        category: 'Security',
        score: 78,
        techs: ['OAuth 2.0', 'RBAC', 'HIPAA', 'Zero Trust', 'CVE Management', 'OWASP'],
    },
    {
        category: 'Full Stack',
        score: 80,
        techs: ['Java Spring', 'Python', 'TypeScript', 'React', 'Next.js', 'GraphQL', 'REST'],
    },
    {
        category: 'MicroServices',
        score: 78,
        techs: ['Spring Boot', 'Spring Cloud', 'Spring Security', 'gRPC', 'Docker', 'Kubernetes', 'OAuth 2.0', 'OpenTelemetry'],
    },
    {
        category: 'Streaming',
        score: 76,
        techs: ['Kafka', 'Spark Streaming', 'socket.io'],
    },
    {
        category: 'Bigdata',
        score: 70,
        techs: ['Spark', 'Cassandra', 'Hadoop', 'Hive'],
    },
    {
        category: 'ML',
        score: 65,
        techs: ['PyTorch', 'MLFlow', 'vLLM', 'LangChain', 'Hugging Face', 'Qdrant'],
    },
    {
        category: 'Cloud / Ops',
        score: 75,
        techs: ['AWS', 'Terraform', 'IaC', 'GitHub Actions'],
    },
];

export default function Skills(props) {
    useEffect(() => {
        const chart = drawRadar(props.theme);
        const handleResize = () => chart?.resize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [props.theme]);

    return (
        <div className="pure-g skills-page">
            <div className="pure-u-1 pure-u-lg-1-2 skills-radar-col">
                <div id="skillsRadar" className="skills-radar-chart" />
            </div>
            <div className="pure-u-1 pure-u-lg-1-2 skills-list-col">
                {skills.map((skill, i) => (
                    <div key={skill.category} className="skill-row">
                        <div className="skill-row-header">
                            <span className="skill-category">{skill.category}</span>
                            <span className="skill-score">{skill.score}%</span>
                        </div>
                        <div className="skill-bar-track">
                            <div
                                className="skill-bar-fill"
                                style={{
                                    width: `${skill.score}%`,
                                    animationDelay: `${i * 0.08}s`,
                                }}
                            />
                        </div>
                        <div className="skill-techs">
                            {skill.techs.map(t => (
                                <span key={t} className="skill-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const themeColors = {
    dark: {
        primary: '#7ec5a6',
        accent: '#12cdea',
        line: 'rgba(126,197,166,0.25)',
        area: 'rgba(126,197,166,0.12)',
    },
    light: {
        primary: '#0060df',
        accent: '#fd6f53',
        line: 'rgba(0,96,223,0.25)',
        area: 'rgba(0,96,223,0.08)',
    },
};

function drawRadar(theme) {
    const chartDom = document.getElementById('skillsRadar');
    echarts.dispose(chartDom);
    const myChart = theme === 'dark'
        ? echarts.init(chartDom, 'dark')
        : echarts.init(chartDom);

    const c = themeColors[theme] ?? themeColors.dark;

    myChart.setOption({
        radar: {
            indicator: skills.map(s => ({ name: s.category, max: 100 })),
            radius: '62%',
            splitNumber: 4,
            axisName: {
                color: c.primary,
                fontSize: 12,
                fontWeight: 600,
            },
            splitLine: { lineStyle: { color: c.line } },
            splitArea: { areaStyle: { color: ['transparent'] } },
            axisLine: { lineStyle: { color: c.line } },
        },
        tooltip: {
            trigger: 'item',
            formatter: params =>
                params.value
                    .map((v, i) => `${skills[i].category}: <b>${v}%</b>`)
                    .join('<br/>'),
        },
        series: [{
            type: 'radar',
            data: [{
                value: skills.map(s => s.score),
                areaStyle: { color: c.area },
                lineStyle: { color: c.primary, width: 2 },
                itemStyle: { color: c.primary },
            }],
            animationDuration: 1200,
            animationEasing: 'cubicOut',
        }],
    });

    return myChart;
}
