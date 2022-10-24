import styles from './Footer.module.css';

const Footer = ({ pageCounter, setPageCounter, listing }) => {
  const maxPageCounter = 8;
  const { canList, setCanList } = listing;
  const pageLister = (increment) => {
    if (
      increment &&
      (canList.availableListing || pageCounter < canList.maxAvailablePage)
    ) {
      pageCounter + 1 <= maxPageCounter
        ? setPageCounter(++pageCounter)
        : setPageCounter(pageCounter);
      if (pageCounter > canList.maxAvailablePage) {
        setCanList({
          availableListing: false,
          maxAvailablePage: pageCounter,
        });
      }
    } else if (!increment) {
      pageCounter - 1 > 0
        ? setPageCounter(--pageCounter)
        : setPageCounter(pageCounter);
    }
  };
  return (
    <div className={styles.Footer}>
      <div
        className={styles.action}
        id="prev"
        onClick={() => pageLister(false)}
      >
        <p>&#60;- Previous</p>
      </div>
      <div className={styles.list}>
        <p>
          <span>{pageCounter}</span>/<span>{maxPageCounter}</span>
        </p>
      </div>
      {pageCounter < maxPageCounter ? (
        <div
          className={styles.action}
          id="next"
          onClick={() => pageLister(true)}
        >
          <p>Next -&#62;</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Footer;
