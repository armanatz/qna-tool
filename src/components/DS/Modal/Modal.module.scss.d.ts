declare const classNames: {
  readonly portal: 'portal';
  readonly overlay: 'overlay';
  readonly main: 'main';
  readonly header: 'header';
  readonly title: 'title';
  readonly content: 'content';
};
export default classNames;
export type ClassNames =
  | 'portal'
  | 'overlay'
  | 'main'
  | 'header'
  | 'title'
  | 'content';
