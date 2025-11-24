import styles from '../page.module.css'

export default function HowToBuy() {
  
  return (
    <section className={styles.section_blog_containers}>
      <h1><span>A guide to buy your flowers:</span> How to purchase flowers for your business</h1>
      <br/>
      <p>At Flowell, we’ve streamlined the process of ordering premium wholesale Colombian flowers so that your experience is both seamless and efficient. Follow these simple steps to place your 
        order and ensure you receive the freshest blooms for your business.</p>
      <br/>
      <div className={styles.instructions_card}>
        <h2>Step 1: Find Your Perfect Product</h2>
        <span>- Browse and Read Descriptions:</span>
        <p>Begin by exploring our product catalog. Each listing provides detailed information about the flower’s physical 
        characteristics and additionally, the descriptions highlight the ideal usage themes—whether for <span className={styles.blog_instructions_text}>weddings, birthdays, Valentine’s Day,</span> or other special events.</p>
      </div>
      <br/>
      <div className={styles.instructions_card}>
        <h2>Step 2: Choose Your Order Quantity</h2>
        <span>- Select the Number of Cases:</span>
        <p>Decide how many boxes (cases) you need. You can order a minimum of 1 case per product and up to 15 cases. 
          However, please note that each order must include a <span className={styles.blog_instructions_text}>minimum of 2 cases to proceed.</span></p>
      </div>
      <br/>
      <div className={styles.instructions_card}>
        <h2>Step 3: Schedule Your Delivery</h2>
        <span>- Add to Cart and Set Your Shipping Date:</span>
        <p>Once you’ve chosen your product and quantity, head to your shopping cart to select your 
          preferred shipping date. Remember this product is dry packed, you'll need to order the product to be delivered at least 3 days before the event. 
          This ensures that the flowers have enough time to properly hydrate and open up before they reach your customers.</p>
          <br/>
        <span>- Delivery Schedule:</span>
        <p>Our shipments are exclusively delivered via FedEx from <span className={styles.blog_instructions_text}>Tuesday to Friday</span>. 
          The shipping calendar is available starting <span className={styles.blog_instructions_text}>7 days after your order is placed</span>. 
          This period allows us to source the best harvest, ensuring your flowers travel the <span className={styles.blog_instructions_text}>4-day journey</span> from 
          Colombia to your business in peak condition.
        </p>
      </div>
      <br/>
      <div className={styles.instructions_card}>
        <h2>Step 4: Prepare for Arrival</h2>
        <span>- Post-Delivery Processing:</span>  
        <p>While you await your delivery, be sure to visit our “Handling Your Flowers” section. 
          Here, you’ll find a comprehensive guide on how to properly rehydrate and process your 
          dry pack flowers once they arrive, ensuring they bloom beautifully.
        </p>
      </div>
      <br/>
      <div className={styles.instructions_card}>
      <h2>Need Assistance?</h2>
      <p>If you have any questions during the ordering process or need further guidance, 
        please don’t hesitate to contact our customer service line. Our expert team is here 
        to help every step of the way.</p>
      </div>
    </section>
  );
}
