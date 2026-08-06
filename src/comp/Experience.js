import data from '../data/experience.json';

export default function Experience() {
    return (
        <div className="page-container">
            <h2 className="page-title">Experience</h2>
            <div className="timeline">
                {data.map((job) => (
                    <div className="timeline-item" key={job.id}>
                        <div className="timeline-dot" />
                        <div className="timeline-card">
                            <div className="timeline-header">
                                <span className="timeline-role">{job.role}</span>
                                <span className="timeline-duration">{job.duration}</span>
                            </div>
                            <div className="timeline-meta">
                                {job.company}
                                {job.location && <span className="timeline-location"> · {job.location}</span>}
                            </div>
                            {job.companyMeta && (
                                <div className="timeline-company-meta">{job.companyMeta}</div>
                            )}
                            <ul className="timeline-highlights">
                                {job.highlights.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
