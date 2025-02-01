import styles from './Home.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const AddProduct = () => {
        navigate('/AddProduct');
    };

    return(
        <div className={styles.homeContainer}>
            <Header/>
            <div className={styles.actionSection}> {/* use context when click on item add to cart via  */}
                <button className={styles.addProductButton} onClick={AddProduct}>
                    Add a product
                </button>
            </div>
            <main className={styles.mainContent}>
                <section className={`${styles.gridSection} ${styles.fadeIn}`}>
                    <div className={styles.glassSection}>
                        <ItemGrid/>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Home;