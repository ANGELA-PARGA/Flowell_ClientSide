import styles from './page.module.css'
import Banner from '@/components/banners/Banner'
import Category from '@/components/banners/Category';
import BannerInformative from '@/components/banners/BannerInformative';

export default function Home() {
  return (
    <section>
      <div className={styles.banner}>
        <div className={styles.bannerGrid}>
          <div className={styles.bannerCarrousel}>
            <Banner/>
          </div>
          <div className={styles.bannerInformative}>
            <BannerInformative/>            
          </div>
        </div>
        <Category></Category>
      </div>
    </section>
  );
}
