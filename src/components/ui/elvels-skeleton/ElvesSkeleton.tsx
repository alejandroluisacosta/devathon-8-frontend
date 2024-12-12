import './elvelsSkeleton.scss';
export const ElvesSkeleton = () => {
  return (
    <div className="elves-skeleton">
      {Array.from({ length: 20 }).map((_, index) => (
        <div className="elves-skeleton__card" key={index}></div>
      ))}
    </div>
  );
};
