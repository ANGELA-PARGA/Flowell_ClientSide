import styles from '../page.module.css'

export default function FloralHandling() {
    return (
        <section className={styles.section_blog_containers}>
            <h1><span>Handling your product:</span> How to handle dry pack flowers</h1>
            <br />
            <p>At Flowell, we take pride in exporting the highest quality Colombian flowers across the United States. 
                Our flowers are shipped in their <span className={styles.blog_instructions_text}>"cut stage" and "dry pack" 
                state</span> —a method designed to protect them during long-distance transport. 
                In this form we ensure that they survive the varying temperatures during truck and air transit, 
                and are ready to bloom upon proper processing. In this post, 
                we outline a step-by-step guide to help you process your dry pack flowers upon 
                arrival as well as instructions for safely storing them if they are not needed immediately.</p>
            <br />
            <h2>Processing Your Dry Pack Flowers Upon Arrival</h2>
            <p>Once your shipment arrives, follow these steps to ensure your flowers reach their full potential:</p>
            <br />
            <ol>
                <div className={styles.instructions_card}>
                    <li><span>1. Inspect and Unpack</span></li>
                    <p>Carefully remove the flowers from their packaging. Inspect your roses and remove any bruised, brown, or damaged petals. 
                        These outer, bruised petals are <span className={styles.blog_instructions_text}>"guard petals"</span> that protect the inner blooms during shipping. You can gently remove them 
                        by pulling them from the base of the rose head and moving in the direction of the stem.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>2. Rehydration Setup</span></li>
                    <p>As the flowers have been transported in a closed, dry state, the next crucial step is <span className={styles.blog_instructions_text}>rehydration</span>. 
                    . Fill a container three-fourths with cold water and stir in the flower food packet provided. These floral packets contain essential ingredients to help extend 
                    the life of your roses. This step is essential for triggering the natural opening of the buds.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>3. Hydration Process</span></li>
                    <p>Cut 1 inch off each stem at a 45-degree angle using sharp, clean clippers. This will allow your roses to absorb more water. Submerge the stems in the prepared water. 
                        Allow the flowers to absorb water slowly. 
                        Depending on the variety, the petals should begin to unfurl within <span className={styles.blog_instructions_text}>12 to 24 hours</span>, and be fully open within 24 to 48 hours. For optimal results, 
                        keep the container in a <span className={styles.blog_instructions_text}>well-ventilated area away from direct sunlight</span>.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>4. Final Adjustments</span></li>
                    <p>After the initial hydration period, inspect the flowers again. If needed, change the water and add fresh preservative to maintain a clean, nutrient-rich environment that promotes healthy blooming.
                        <span className={styles.blog_instructions_text}> Recut stems every few days, removing 1-2 inches. Change the water every 2-4 days, or sooner if cloudy. Keep flowers in a cool, dark place (65°F–72°F) for longer freshness.</span>
                    </p>
                </div>
            </ol>
            <br />
            <h2>Storing Your Dry Pack Flowers in a Cooler</h2>
            <p>If your schedule requires you to delay the processing, it’s important to store the flowers correctly to preserve their quality:</p>
            <br />
            <ol>
                <div className={styles.instructions_card}>
                    <li><span>1. Temperature Control</span></li>
                    <p>Keep the flowers in a cooler or refrigerated unit. The ideal storage temperature typically ranges <span className={styles.blog_instructions_text}>between 34°F and 36°F (1°C to 2°C)</span> . 
                    This low temperature helps slow down the metabolism of the flowers, preserving their condition until you are ready to process them.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>2. Humidity and Airflow</span></li>
                    <p>Ensure that the cooler maintains a moderate humidity level and that the flowers are not crowded. <span className={styles.blog_instructions_text}>Good airflow is essential</span> to avoid the buildup of condensation and prevent mold or decay.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>3. Short-Term Storage Guidelines</span></li>
                    <p>For best results, limit the storage duration in the cooler to <span className={styles.blog_instructions_text}>no more than 3 days</span>. If longer storage is necessary, monitor the condition of the flowers frequently and consider a 
                    brief rehydration period before final processing.</p>
                </div>
                <br />
                <div className={styles.instructions_card}>
                    <li><span>4. Processing After Storage</span></li>
                    <p>When you’re ready to use the flowers, remove them from the cooler and allow them to acclimate to room temperature. 
                      Follow the <span className={styles.blog_instructions_text}>rehydration process</span> described above to encourage a full, healthy bloom.</p>
                </div>
            </ol>
            <br />
            <p>Proper handling of dry pack flowers is critical for ensuring that the stunning blooms you receive maintain their quality and beauty. By following our step-by-step guides—whether processing immediately upon arrival or storing in a cooler for later use—you can ensure that your flowers reach their full potential, delighting your customers with their vibrant and fresh appearance. At Flowell, we are dedicated to supporting our partners with high-quality products and expert guidance every step of the way.</p>
        </section>
    );
}
