import data from '../data/certifications.json';

const categoryColor = {
    Cloud: 'var(--color-primary)',
    Data: '#9a60b4',
    DevOps: '#1b60b4',
    Agile: '#d16d05',
};

export default function Certifications() {
    return (
        <div className="page-container">
            <h2 className="page-title">Certifications</h2>
            <div className="pure-g cert-grid">
                {data.map((cert) => (
                    <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 cert-cell" key={cert.id}>
                        <div className="cert-card">
                            <span
                                className="cert-category"
                                style={{ borderColor: categoryColor[cert.category] ?? 'var(--color-primary)', color: categoryColor[cert.category] ?? 'var(--color-primary)' }}
                            >
                                {cert.category}
                            </span>
                            <p className="cert-name">{cert.name}</p>
                            <div className="cert-footer">
                                <span className="cert-issuer">{cert.issuer}</span>
                                <span className="cert-year">{cert.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
