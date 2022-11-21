import { ActionButtons, CurrentNode, Quad } from '../../components';
import { useAppSelector } from '../../app/hooks';
import { selectRootNode } from '../../features/treeSlice';

export const Tree = () => {
  const nodeToRender = useAppSelector(selectRootNode);

  if (!nodeToRender) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full grid grid-rows-4 gap-4 lg:grid-cols-3 lg:gap-8 py-4 px-4 lg:px-8 lg:py-8'>
      {/* Parent Node */}
      <div className='grid row-span-3 lg:row-span-4 lg:col-span-2'>
        <section aria-labelledby='parent-square'>
          <div className='h-full rounded-xl overflow-hidden shadow border'>
            <Quad nodeToRender={nodeToRender} className='h-full' />
          </div>
        </section>
      </div>

      {/* Right column */}
      <div className='grid gap-4 lg:gap-8'>
        <section aria-labelledby='current-node'>
          <div className='rounded-lg bg-white overflow-hidden shadow-lg'>
            <CurrentNode />
          </div>
        </section>
        <section aria-labelledby='action-buttons'>
          <ActionButtons className='flex flex-row flex-wrap justify-between' />
        </section>
      </div>
    </div>
  );
};
