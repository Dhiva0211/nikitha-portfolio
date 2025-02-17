import { FC } from 'react';
import styles from './styles.module.css';

const DotsAnimation: FC = () => (
  <section className="flex justify-center">
    <section className={styles.loader} />
  </section>
);

export default DotsAnimation;
