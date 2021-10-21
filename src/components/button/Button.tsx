import { useHistory } from 'react-router-dom';
import { ReactNode } from 'react';

// CSS
import './Button.css';

// Types
type Props = {
  children: ReactNode;
  dataTest?: string;
  onClick?: (e: any) => void;
  to?: string;
};

const rootClass = 'primaryBtn';

export function Button({ children, dataTest = 'button', onClick, to }: Props) {
  // Hooks
  const history = useHistory();

  // TODO: type this event
  const onBtnClick = (e: any) => {
    onClick?.(e);
    if (to) history.push(to);
  };

  return (
    <button className={rootClass} data-testid={dataTest} onClick={onBtnClick}>
      {children}
    </button>
  );
}
