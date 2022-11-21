import { MouseEvent } from 'react';
import clsx from 'clsx';

import {
  NodeState,
  addChildren,
  addToUndoPath,
} from '../../features/treeSlice';
import { useAppDispatch } from '../../app/hooks';

export const Quad = ({
  nodeToRender,
  className,
}: {
  nodeToRender: NodeState;
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent, nodeId: string) => {
    event.stopPropagation();
    dispatch(addToUndoPath({ nodeId }));
    dispatch(addChildren({ nodeId }));
  };

  return (
    <div
      onClick={(event) => handleClick(event, nodeToRender.nodeId)}
      style={{ background: nodeToRender.background }}
      className={clsx('grid grid-cols-2 text-white', className)}
    >
      {!!nodeToRender.nodes.length &&
        nodeToRender.nodes.map((eachNode) => (
          <Quad key={eachNode.nodeId} nodeToRender={eachNode} />
        ))}
    </div>
  );
};
