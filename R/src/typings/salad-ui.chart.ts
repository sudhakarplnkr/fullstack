declare module 'salad-ui.chart' {
    export interface CirclePieOptions {
        width: number;
        height: number;
        strokeWidth: number;
        percent: number;
        strokeColor: string;
    }
    export class CirclePie extends React.Component<CirclePieOptions, {}> {

    }
}