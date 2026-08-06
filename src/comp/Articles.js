import { BookIcon, PlayIcon } from '@primer/octicons-react';
import data from '../data/articles.json';

const typeIcon = {
    Article: <BookIcon size={15} />,
    Talk: <PlayIcon size={15} />,
};

const typeClass = {
    Article: 'article-tag article-tag-article',
    Talk: 'article-tag article-tag-talk',
};

export default function Articles() {
    return (
        <div className="page-container">
            <h2 className="page-title">Articles &amp; Talks</h2>
            <div className="article-list">
                {data.map((item) => (
                    <div className="article-card" key={item.id}>
                        <div className="article-card-body">
                            <p className="article-title">{item.title}</p>
                            <span className="article-publication">{item.publication} · {item.year}</span>
                        </div>
                        <div className="article-card-right">
                            <span className={typeClass[item.type] ?? 'article-tag'}>
                                {typeIcon[item.type]}
                                {item.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
