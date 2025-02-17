import { Fragment, Key, ReactNode } from 'react';

interface RenderIfProps {
  condition: boolean;
  then: React.ReactNode;
  otherwise: React.ReactNode;
}

const RenderIf = ({ condition, then, otherwise }: RenderIfProps): ReactNode =>
  condition ? then : otherwise || null;

interface RenderSwitchProps<T> {
  value: keyof T;
  cases: T;
  defaultCase: React.ReactNode;
}

const RenderSwitch = <
  T extends Record<string | number | symbol, React.ReactNode>,
>({
  value,
  cases,
  defaultCase,
}: RenderSwitchProps<T>): React.ReactNode =>
  cases[String(value)] || defaultCase || null;

interface RenderForProps<T> {
  list: ReadonlyArray<T>;
  children: (item: T, index?: number) => React.ReactNode;
}

const RenderFor = <T extends Key | null | undefined>({
  list,
  children,
}: RenderForProps<T>): React.ReactNode =>
  list.map((item, index) => (
    <Fragment key={item as Key}>{children(item, index)}</Fragment>
  ));

export { RenderIf, RenderSwitch, RenderFor };
