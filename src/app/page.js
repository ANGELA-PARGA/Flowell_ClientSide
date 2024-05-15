import styles from './page.module.css'
import Banner from '../_components/_layout_components/Banner'
import Category from '@/_components/_layout_components/Category';
import BannerInformative from '@/_components/_layout_components/BannerInformative';

export default function Home() {
  return (
    <main>
      <div className={styles.banner}>
        <Banner></Banner>
        <Category></Category>
        <BannerInformative/>
      </div>
    </main>
  );
}
