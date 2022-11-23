import tinyColor from 'tinycolor2';
import { NodeState, TreeState } from '@/features/treeSlice';

export const createChildren = (nodeId: string, quantity = 4) => {
  let nodes = [] as NodeState[];

  for (let i = 0; i < quantity; i++) {
    const nodeToPush = {
      nodeId: `${nodeId}-${i}`,
      parentId: nodeId,
      nodes: [],
      level: `${nodeId}-${i}`.split('').filter((el) => el === '-').length,
      background: tinyColor.random().toString(),
    } as NodeState;

    nodes = [...nodes, ...[nodeToPush]];
  }
  return nodes;
};

export const findNode = ({
  state,
  nodeId,
}: {
  state: TreeState;
  nodeId: string;
}): NodeState => {
  if (!state.rootNode.nodes.length) {
    return state.rootNode;
  }

  const ids = nodeId.split('-');
  ids.shift();

  if (!ids.length) {
    return state.rootNode;
  }

  let currentNode = { ...state.rootNode };

  for (let i = 0; i < ids.length; i++) {
    currentNode = currentNode.nodes[+ids[i]];
  }

  return currentNode;
};

const mapAll = (nodes: NodeState[]) => {
  return nodes.map(({ nodeId, parentId, background, level }) => {
    return {
      nodeId,
      level,
      parentId,
      background,
    };
  });
};

export const flatten = (tree: NodeState[]) => {
  let pathArr = [] as NodeState[];
  const flatRec = (tree: NodeState[]) => {
    pathArr = [...pathArr, ...mapAll(tree)] as NodeState[];

    tree.forEach((item: { nodes: NodeState[] }) => {
      if (item?.nodes?.length) {
        flatRec(item.nodes);
      }
    });

    return pathArr;
  };

  return flatRec(tree);
};
