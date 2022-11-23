import { createSlice, current } from '@reduxjs/toolkit';
import tinyColor from 'tinycolor2';
import { WritableDraft } from 'immer/dist/types/types-external';

import { createChildren, findNode } from '@/app/util';
import { RootState } from '@/app/store';

export interface TreeState {
  currentNode: NodeState | null;
  rootNode: NodeState;
  futurePath: NodeState[];
  pastPath: string[];
}

export interface NodeState {
  nodeId: string;
  parentId: string | null;
  nodes: NodeState[];
  background: string;
  level: number;
}

const initialState = {
  currentNode: null,
  rootNode: {
    nodeId: '0',
    parentId: null,
    nodes: [],
    level: 0,
    background: tinyColor('black').toString(),
  },
  futurePath: [],
  pastPath: [],
} as TreeState;

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    addChildren: (state, action) => {
      const foundNode = findNode({
        state,
        nodeId: action.payload.nodeId,
      });

      state.futurePath.splice(0, state.futurePath.indexOf(foundNode));

      foundNode.nodes = [...createChildren(foundNode.nodeId)];
      state.currentNode = foundNode;
      console.log({ state: current(state) });
    },
    resetState: (state) => {
      state.currentNode = null;
      state.futurePath = [];
      state.pastPath = [];
      state.rootNode = { ...initialState.rootNode };
      console.log({ state: current(state) });
    },
    undoTree: (state) => {
      const lastNode = state.pastPath.pop();

      if (!lastNode) {
        return;
      }

      state.futurePath.push(state.currentNode as WritableDraft<NodeState>);

      const foundNode = findNode({
        state,
        nodeId: lastNode,
      });

      foundNode.nodes = [];

      state.currentNode = findNode({
        state,
        nodeId: state.pastPath[state.pastPath.length - 1],
      });

      console.log({ state: current(state) });
    },
    redoTree: (state) => {
      const lastNode = state.futurePath.pop();
      if (!lastNode) {
        return;
      }
      const foundNode = findNode({ state, nodeId: lastNode.nodeId });

      foundNode.nodes = lastNode.nodes;

      state.currentNode = lastNode;
      state.pastPath.push(lastNode.nodeId);

      console.log({ state: current(state) });
    },
    addToUndoPath: (state, action) => {
      state.pastPath.push(action.payload.nodeId);
    },
  },
});

export const { addChildren, resetState, undoTree, redoTree, addToUndoPath } =
  treeSlice.actions;

export const selectFuturePath = (state: RootState) => state.tree.futurePath;
export const selectPastPath = (state: RootState) => state.tree.pastPath;
export const selectNode = (state: RootState) => state.tree;
export const selectRootNode = (state: RootState) => state.tree.rootNode;
export const selectCurrentNode = (state: RootState) => state.tree.currentNode;

export default treeSlice.reducer;
