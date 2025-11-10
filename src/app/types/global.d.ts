declare const __BASE__: string;

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
