import React from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const VirtualizedTable = ({ items, rowHeight = 50, renderRow }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={rowHeight}
        >
          {({ index, style }) => renderRow({ item: items[index], style })}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default React.memo(VirtualizedTable);
