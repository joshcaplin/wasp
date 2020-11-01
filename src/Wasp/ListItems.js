import React from 'react';
import t from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const getDraggableItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  border: isDragging ? '1px solid #028e23' : '1px solid #aaaaaa',
  background: '#f6f6f6',
  margin: '3px 0',
  borderRadius: '4px',
  ...draggableStyle,
});

const ListItems = (props) => {
  const { allStrings, items } = props;

  const renderItems = () => {
    const listItems = [];

    !Array.isArray(items) ? (
      listItems.push(
        <Draggable key="0" draggableId="0" index={0} isDragDisabled={true}>
          {(itemprovided, itemSnapshot) => {
            return (
              <div
                ref={itemprovided.innerRef}
                {...itemprovided.draggableProps}
                {...itemprovided.dragHandleProps}
                style={getDraggableItemStyle(itemSnapshot.isDragging, itemprovided.draggableProps.style)}
                className="draggable-item"
              >
                <span className="text-danger">Array of items was not detected - cannot display draggable list &#9785;&#65039;</span>
              </div>
            );
          }}
        </Draggable>
      )
    ) : (
        items.map((item, index) => (
          listItems.push(
            <Draggable
              key={index}
              draggableId={`${index}`}
              index={index}
            >
              {(itemprovided, itemSnapshot) => {
                if (itemSnapshot.isDragging) {
                  itemprovided.draggableProps.style.left = itemprovided.draggableProps.style.offsetLeft;
                  itemprovided.draggableProps.style.top = itemprovided.draggableProps.style.offsetTop;
                }
                return (
                  <div
                    ref={itemprovided.innerRef}
                    {...itemprovided.draggableProps}
                    {...itemprovided.dragHandleProps}
                    style={getDraggableItemStyle(itemSnapshot.isDragging, itemprovided.draggableProps.style)}
                    className="draggable-item"
                  >
                    {allStrings ? (
                      <p className="item-title text-default">
                        {item}
                      </p>
                    ) : (
                        <div>
                          <p className="item-title text-highlight">
                            {item.title || '?'}
                          </p>
                          <p className="item-description text-default">
                            {item.description || '?'}
                          </p>
                        </div>
                      )}
                  </div>
                );
              }}
            </Draggable>
          )
        )
      )
    );

    return listItems;
  };

  return (
    <React.Fragment>
      {renderItems()}
    </React.Fragment>
  );
};

ListItems.propTypes = {
  allStrings: t.bool.isRequired,
  items: t.arrayOf(t.oneOfType([
    t.string,
    t.shape({
      title: t.string.isRequired,
      description: t.string,
    }),
  ])).isRequired,
};
ListItems.defaultProps = {
  allStrings: true,
  items: [],
};

export default ListItems;
