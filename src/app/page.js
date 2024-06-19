import styles from './page.module.css'
import Banner from '../_components/_layout_components/banners/Banner'
import Category from '@/_components/_layout_components/banners/Category';
import BannerInformative from '@/_components/_layout_components/banners/BannerInformative';

export default function Home() {
  return (
    <section>
      <div className={styles.banner}>
        <Banner></Banner>
        <Category></Category>
        <BannerInformative/>
      </div>
    </section>
  );
}
