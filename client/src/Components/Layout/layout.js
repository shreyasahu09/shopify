import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import { Toaster } from "react-hot-toast";

const layout = ({ children,
  title = 'Ecommerece app - shop now',
  description = 'MERN Stack Project',
  keywords = 'mern, react, node, mongodb',
  author = 'Saksham Jain, Pranjali Sharma, Yatendra Rajput' 
}) => {
  return (
    <div>
      <Helmet>
      <meta charset="UTF-8"/>
      
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <title>{title}</title>

      </Helmet>
   <Header />
   <main style={{ minHeight: "70vh"}} >
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};



export default layout