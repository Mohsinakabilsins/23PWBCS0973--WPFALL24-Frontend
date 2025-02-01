import styles from './AddProductPage.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreateProduct from "../../components/createProduct/createProduct";

function AddProductPage() {
    return(
        <div className={styles.homeContainer}>
            <Header/>
            <div className={styles.actionSection}> {/* use context when click on item add to cart via  */}
            </div>
            <main className={styles.mainContent}>
                <section className={`${styles.gridSection} ${styles.fadeIn}`}>
                    <div className={styles.glassSection}>
                        <CreateProduct/>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default AddProductPage;