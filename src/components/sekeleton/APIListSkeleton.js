import '../../styles/components/sekeleton/APIListSkeleton.css';
import BaseSkeleton from './BaseSkeleton';

const APIListSkeletonItem = () => (
    <div className="api-list-skeleton-item">
        <div className="api-list-skeleton-item-image"></div>
        <div className="api-list-skeleton-item-title"></div>
        <div className="api-list-skeleton-item-description"></div>
        <div className="api-list-skeleton-item-description"></div>
    </div>
);

export const APIListSkeleton = () => (
    <BaseSkeleton>
        <div className="api-list-skeleton">
            <APIListSkeletonItem />
            <APIListSkeletonItem />
            <APIListSkeletonItem />
            <APIListSkeletonItem />
        </div>
    </BaseSkeleton>
);
