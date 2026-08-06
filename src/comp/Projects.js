import { LinkExternalIcon, MarkGithubIcon } from '@primer/octicons-react';
import data from '../data/projects.json';

export default function Projects() {
    return (
        <div className="page-container">
            <h2 className="page-title">Projects</h2>
            <div className="pure-g project-grid">
                {data.map((project) => (
                    <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 project-cell" key={project.id}>
                        <div className="project-card">
                            <div className="project-card-header">
                                <span className="project-name">{project.name}</span>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub">
                                            <MarkGithubIcon size={18} />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noreferrer" className="project-link" aria-label="Live">
                                            <LinkExternalIcon size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tech">
                                {project.tech.map((t) => (
                                    <span className="tech-tag" key={t}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
