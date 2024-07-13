import styles from './page.module.css'
import Banner from '@/components/banners/Banner'
import Category from '@/components/banners/Category';
import BannerInformative from '@/components/banners/BannerInformative';

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
