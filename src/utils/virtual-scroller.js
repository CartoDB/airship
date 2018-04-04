import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';

// Copies a variable number of methods from source to target.
const rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

/*
 *  Virtual Scrolling with D3 by Bill White
 *
 *  Example: http://bl.ocks.org/billdwhite/36d15bc6126e6f6365d0
 */

export default function() {
  let enter = null;
  let update = null;
  let exit = null;
  let data = [];
  let dataid = null;
  let svg = null;
  let viewport = null;
  let totalRows = 0;
  let position = 0;
  let rowHeight = 24;
  let totalHeight = 0;
  let minHeight = 0;
  let viewportHeight = 0;
  let visibleRows = 0;
  let delta = 0;
  const dispatchFn = dispatch('pageDown','pageUp');



  function virtualscroller(container) {
    function render(resize) {
      if (resize) {
        viewportHeight = parseInt(viewport.style('height'));
        visibleRows = Math.ceil(viewportHeight / rowHeight) + 1;
      }

      const scrollTop = viewport.node().scrollTop;
      const lastPosition = position;

      totalHeight = Math.max(minHeight, (totalRows * rowHeight));

      svg
        .style('height', totalHeight + 'px')
        .attr('height', totalHeight);

      position = Math.floor(scrollTop / rowHeight);
      delta = position - lastPosition;

      scrollRenderFrame(position);
    }


    function scrollRenderFrame(scrollPosition) {
        container.attr('transform', 'translate(0,' + (scrollPosition * rowHeight) + ')');

        const position0 = Math.max(0, Math.min(scrollPosition, totalRows - visibleRows + 1));
        const position1 = position0 + visibleRows;

        container.each(function() {
          const rowSelection = container
              .selectAll('.row')
              .data(data.slice(position0, Math.min(position1, totalRows)), dataid);

          rowSelection
            .exit()
            .call(exit)
            .remove();

          rowSelection
            .enter()
            .append('g')
              .attr('class', 'row')
              .call(enter);

          rowSelection.order();

          const rowUpdateSelection = container.selectAll('.row:not(.transitioning)');

          rowUpdateSelection.call(update);

          rowUpdateSelection.each(function(d, i) {
            select(this).attr('transform', d => `translate(0, ${i * rowHeight})`);
          });
        });

        if (position1 > (data.length - visibleRows)) {
          dispatchFn.call('pageDown', this, { delta });
        } else if (position0 < visibleRows) {
          dispatchFn.call('pageUp', this, { delta });
        }
    }

    virtualscroller.render = render;
    viewport.on('scroll.virtualscroller', render);

    render(true);
  }

  // Overriden at runtime
  virtualscroller.render = function(resize) {};

  virtualscroller.data = function(_, __) {
    if (!arguments.length) return data;

    data = _;
    dataid = __;

    return virtualscroller;
  };

  virtualscroller.dataid = function(_) {
    if (!arguments.length) return dataid;

    dataid = _;

    return virtualscroller;
  };

  virtualscroller.enter = function(_) {
    if (!arguments.length) return enter;

    enter = _;

    return virtualscroller;
  };

  virtualscroller.update = function(_) {
    if (!arguments.length) return update;

    update = _;

    return virtualscroller;
  };

  virtualscroller.exit = function(_) {
    if (!arguments.length) return exit;

    exit = _;

    return virtualscroller;
  };

  virtualscroller.totalRows = function(_) {
    if (!arguments.length) return totalRows;

    totalRows = _;

    return virtualscroller;
  };

  virtualscroller.rowHeight = function(_) {
    if (!arguments.length) return rowHeight;

    rowHeight = +_;

    return virtualscroller;
  };

  virtualscroller.totalHeight = function(_) {
    if (!arguments.length) return totalHeight;

    totalHeight = +_;

    return virtualscroller;
  };

  virtualscroller.minHeight = function(_) {
    if (!arguments.length) return minHeight;

    minHeight = +_;

    return virtualscroller;
  };

  virtualscroller.position = function(_) {
    if (!arguments.length) return position;

    position = +_;
    if (viewport) {
        viewport.node().scrollTop = position;
    }

    return virtualscroller;
  };

  virtualscroller.svg = function(_) {
    if (!arguments.length) return svg;

    svg = _;

    return virtualscroller;
  };

  virtualscroller.viewport = function(_) {
    if (!arguments.length) return viewport;

    viewport = _;

    return virtualscroller;
  };

  virtualscroller.delta = function() {
      return delta;
  };

  return virtualscroller;
};
