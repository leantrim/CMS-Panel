import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDragLayer, XYCoord } from 'react-dnd';

function CustomDragLayer() {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 100, left: 0, top: 0, width: '70%', height: '100%' }}
    >
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div className={'flex py-2 justify-between w-full bg-white rounded-sm shadow-sm px-4 hover:shadow-lg'}>
          <div className="flex-center gap-4">
            <div>{item.blockType}</div>
            <Button variant="outline" size={'extraSmall'} className="p-2">
              Redigera
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Switch className="bg-gray-500 " />
            <Label htmlFor="dragg" className="">
              Synlig
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomDragLayer;
