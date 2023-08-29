import clsx from 'clsx';

import { useAppSelector } from '@/app/hooks';
import { NodeState, selectCurrentNode } from '@/features/treeSlice';

const CurrentNodeWrapper = ({
  children,
  background,
  className,
}: {
  children: React.ReactNode;
  background?: string;
  className?: string;
}) => (
  <div
    style={{ background }}
    className={clsx(`flex flex-start flex-col p-4`, className)}
  >
    {children}
  </div>
);

const CurrentNodeInfo = ({ nodeId, level, parentId }: Partial<NodeState>) => {
  return (
    <>
      <div className='flex justify-center text-lg font-bold mix-blend-difference text-white'>
        <span>Current Node</span>
      </div>
      <div className='text-sm font-medium mix-blend-difference text-white'>
        <p>
          <strong>NodeID: </strong> {nodeId}
        </p>
        <p>
          <strong>ParentId: {parentId}</strong>
        </p>
        <p>
          <strong>Level: {level}</strong>
        </p>
      </div>
    </>
  );
};

export const CurrentNode = ({ className }: { className?: string }) => {
  const currentNode = useAppSelector(selectCurrentNode);

  return (
    <>
      {!currentNode ? (
        <CurrentNodeWrapper className={className}>
          <div>
            <p>Click on the black box</p>
          </div>
        </CurrentNodeWrapper>
      ) : (
        <CurrentNodeWrapper
          background={currentNode.background}
          className={className}
        >
          {CurrentNodeInfo(currentNode)}
        </CurrentNodeWrapper>
      )}
    </>
  );
};
