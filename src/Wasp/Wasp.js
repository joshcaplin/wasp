import React, { useEffect, useState } from 'react';
import t from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './Wasp.css';
import ErrorBoundary from './ErrorBoundary';
import ListItems from './ListItems';

const getListContainerStyle = isDraggingOver => ({
  background: isDraggingOver ? '#a7e8b6' : '#e8e8e8',
  borderRadius: '4px',
});

const Wasp = (props) => {
  const { darkMode, itemsToList, onReorder } = props;

  const [allStrings, setAllStrings] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setAllStrings(isStringArray(itemsToList));
    setItems(itemsToList);
  }, [itemsToList]);

  useEffect(() => {
    // TODO - coming soon
    // console.log(`dark mode changed to: ${darkMode}`);
  }, [darkMode]);

  const isStringArray = (items) => {
    return Array.isArray(items) && items.every(i => (typeof i === 'string'));
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedItems = reorder(items, result.source.index, result.destination.index);
    setItems(reorderedItems);

    if (typeof onReorder === 'function') {
      onReorder(reorderedItems);
    }
  };

  const reorder = (origList, indexOriginal, indexDestination) => {
    const splicedList = Array.from(origList);
    const [removed] = splicedList.splice(indexOriginal, 1);

    splicedList.splice(indexDestination, 0, removed);
    return splicedList;
  };

  return (
    <React.Fragment>
      <ErrorBoundary>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListContainerStyle(snapshot.isDraggingOver)}
                className="droppable-container"
              >
                <ListItems
                  allStrings={allStrings}
                  items={items}
                />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ErrorBoundary>
    </React.Fragment>
  );
};

Wasp.propTypes = {
  darkMode: t.bool,
  itemsToList: t.arrayOf(t.oneOfType([
    t.string,
    t.shape({
      title: t.string.isRequired,
      description: t.string,
    }),
  ])).isRequired,
  onReorder: t.func,
};
Wasp.defaultProps = {
  darkMode: false,
  itemsToList: [],
  onReorder: () => {},
};

export default Wasp;
