import { PipePivot } from '../pipe/pipe.types';

export declare function pivotForm(source: { schema: any; data: any }, comparator: (x: any, y: any) => number): PipePivot;
