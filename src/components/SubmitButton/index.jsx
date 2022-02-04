import styles from './styles.module.scss';

export function SubmitButton ({ isLoading, title, ...rest }) {
  return (
    <div className={styles.container}>
      <button
        {...rest}
      >
        {isLoading ? 'Enviando ...' : <span>{title}</span>}
      </button>
    </div>
  );
}