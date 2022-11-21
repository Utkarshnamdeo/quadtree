import { useRef } from 'react';
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from '@heroicons/react/24/solid';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  redoTree,
  resetState,
  selectFuturePath,
  selectPastPath,
  undoTree,
} from '../../features/treeSlice';

export const ActionButtons = ({ className }: { className: string }) => {
  const pastPath = useAppSelector(selectPastPath);
  const futurePath = useAppSelector(selectFuturePath);

  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const undoButtonRef = useRef<HTMLButtonElement>(null);
  const redoButtonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  useHotkeys('ctrl+c', () => clearButtonRef.current?.click());
  useHotkeys('ctrl+z', () => undoButtonRef.current?.click());
  useHotkeys('ctrl+y', () => redoButtonRef.current?.click());

  const undo = () => {
    dispatch(undoTree());
  };

  const redo = () => {
    dispatch(redoTree());
  };

  const clear = () => {
    dispatch(resetState());
  };

  return (
    <div className={className}>
      <button
        ref={undoButtonRef}
        onClick={undo}
        type='button'
        disabled={!pastPath.length}
        className='disabled:cursor-not-allowed flex items-center px-6 py-3 m-2 border border-transparent shadow-2xl text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        undo
        <ArrowUturnDownIcon className='ml-3 -mr-1 h-5 w-5' aria-hidden='true' />
      </button>
      <button
        onClick={redo}
        ref={redoButtonRef}
        disabled={!futurePath.length}
        type='button'
        className='disabled:cursor-not-allowed inline-flex items-center px-6 py-3 m-2 border border-transparent shadow-2xl text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Redo
        <ArrowDownIcon className='ml-3 -mr-1 h-5 w-5' aria-hidden='true' />
      </button>
      <button
        ref={clearButtonRef}
        onClick={clear}
        type='button'
        disabled={!pastPath.length && !futurePath.length}
        className='disabled:cursor-not-allowed inline-flex items-center px-6 py-3 m-2 border border-transparent shadow-2xl text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Clear
        <ArrowPathIcon className='ml-3 -mr-1 h-5 w-5' aria-hidden='true' />
      </button>
    </div>
  );
};
