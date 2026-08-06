import { GitPullRequestIcon, IssueOpenedIcon, FileIcon, MarkGithubIcon } from '@primer/octicons-react';
import data from '../data/opensource.json';

const typeIcon = {
    PR: <GitPullRequestIcon size={16} />,
    Issue: <IssueOpenedIcon size={16} />,
    Docs: <FileIcon size={16} />,
};

const typeClass = {
    PR: 'os-tag os-tag-pr',
    Issue: 'os-tag os-tag-issue',
    Docs: 'os-tag os-tag-docs',
};

export default function OpenSource() {
    return (
        <div className="page-container">
            <h2 className="page-title">Open Source</h2>
            <div className="os-list">
                {data.map((item) => (
                    <a
                        className="os-card"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        key={item.id}
                    >
                        <div className="os-card-left">
                            <MarkGithubIcon size={20} className="os-github-icon" />
                        </div>
                        <div className="os-card-body">
                            <span className="os-repo">{item.repo}</span>
                            <p className="os-description">{item.description}</p>
                        </div>
                        <div className="os-card-right">
                            <span className={typeClass[item.type] ?? 'os-tag'}>
                                {typeIcon[item.type]}
                                {item.type}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
