import { BaseType, Selection } from 'd3-selection';

type Container<T extends BaseType, E, V extends BaseType = null, W = undefined> = Selection<T, E, V, W>;

export type SVGContainer<E = {}, V extends BaseType = null, W = undefined> = Container<SVGElement, E, V, W>;
