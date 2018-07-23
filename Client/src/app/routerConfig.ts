import { Routes, ActivatedRoute } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component'
import { HomeComponent } from './home/home.component'
import { FooterComponent } from './footer/footer.component'
import { CartComponent } from './cart/cart.component'
import { ContactUsComponent } from './contact-us/contact-us.component'

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'productDetails/:uniq_id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'shop/searchResult/:keyword',
    component: ShopComponent
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  }
];