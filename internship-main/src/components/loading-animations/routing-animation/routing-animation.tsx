import { FC, useEffect } from 'react';
import styles from './dots.module.css';

const RoutingAnimation: FC = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return (
    <dialog className="fixed inset-0 flex items-center justify-center">
      <section className="fixed inset-0 overflow-y-auto transition-all duration-300 ease-in-out">
        <section className="flex min-h-full items-center justify-center bg-slate-900/60 text-center">
          <section className="relative m-10 rounded-lg bg-white text-left shadow-xl transition-all">
            <section className="flex flex-col items-center p-5">
              <section className="flex space-x-4">
                <section
                  className={`${styles['animate-bounce100']} size-6 rounded-full bg-deep-sapphire`}
                />
                <section
                  className={`${styles['animate-bounce200']} size-6 rounded-full bg-deep-sapphire`}
                />
                <section
                  className={`${styles['animate-bounce400']} size-6 rounded-full bg-deep-sapphire`}
                />
              </section>
            </section>
          </section>
        </section>
      </section>
    </dialog>
  );
};

export default RoutingAnimation;
