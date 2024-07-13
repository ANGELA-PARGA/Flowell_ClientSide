import Link from "next/link";

const PaginationButton = ({number, url}) => {

  return (
    <Link href={url}><button>{number}</button></Link>
  )
}

export default PaginationButton

