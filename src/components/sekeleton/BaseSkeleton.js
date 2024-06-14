import '../../styles/components/sekeleton/BaseSkeleton.css';

const BaseSkeleton = ({children}) => (
    <div className="skeleton">
        {children}
    </div>
);

export default BaseSkeleton;