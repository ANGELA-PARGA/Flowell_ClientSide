import Link from "next/link";
import styles from './components.module.css'
const PaginationButton = ({number, url}) => {

  return (
    <Link href={url}><button className={styles.paginationButton}>{number}</button></Link>
  )
}

export default PaginationButton

