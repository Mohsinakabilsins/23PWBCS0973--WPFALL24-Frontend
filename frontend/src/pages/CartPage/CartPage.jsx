import styles from "./CartPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";

function CartPage({ children }) {
    return (
        <div>
            <Header/>
            <div className={styles.page}>
                <div className={styles.cartContainer}>
                    <Cart />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default CartPage;