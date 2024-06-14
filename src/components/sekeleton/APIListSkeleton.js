import '../../styles/components/sekeleton/APIListSkeleton.css';
import BaseSkeleton from './BaseSkeleton';

export const APIListSkeleton = () => (
    <BaseSkeleton>
        <div className="api-list-skeleton">
            <div className="api-list-skeleton-item">
                <div className="api-list-skeleton-item-header"></div>
                <div className="api-list-skeleton-item-body"></div>
            </div>
            <div className="api-list-skeleton-item">
                <div className="api-list-skeleton-item-header"></div>
                <div className="api-list-skeleton-item-body"></div>
            </div>
            <div className="api-list-skeleton-item">
                <div className="api-list-skeleton-item-header"></div>
                <div className="api-list-skeleton-item-body"></div>
            </div>
            <div className="api-list-skeleton-item">
                <div className="api-list-skeleton-item-header"></div>
                <div className="api-list-skeleton-item-body"></div>
            </div>
        </div>
    </BaseSkeleton>
);