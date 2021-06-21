import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'profile',
    loadChildren : './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },


  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'productlist', loadChildren: './productlist/productlist.module#ProductlistPageModule' },
  { path: 'product-details', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'addproduct', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'addcat', loadChildren: './addcat/addcat.module#AddcatPageModule' },
  { path: 'editproduct', loadChildren: './editproduct/editproduct.module#EditproductPageModule' },
  { path: 'addslide', loadChildren: './addslide/addslide.module#AddslidePageModule' },
  { path: 'loginadmin', loadChildren: './loginadmin/loginadmin.module#LoginadminPageModule' },
  { path: 'editcat', loadChildren: './editcat/editcat.module#EditcatPageModule' },
  { path: 'profileedit', loadChildren: './profileedit/profileedit.module#ProfileeditPageModule' },
  { path: 'editaboutus', loadChildren: './editaboutus/editaboutus.module#EditaboutusPageModule' },
  { path: 'editspecial', loadChildren: './editspecial/editspecial.module#EditspecialPageModule' },
  { path: 'editnewarrival', loadChildren: './editnewarrival/editnewarrival.module#EditnewarrivalPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  { path: 'borrowed-books', loadChildren: './borrowed-books/borrowed-books.module#BorrowedBooksPageModule' },
  { path: 'borrowingrequest', loadChildren: './borrowingrequest/borrowingrequest.module#BorrowingrequestPageModule' },
  { path: 'membership', loadChildren: './membership/membership.module#MembershipPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
