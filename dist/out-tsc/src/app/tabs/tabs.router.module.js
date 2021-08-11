import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
var routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'welcome',
                children: [
                    {
                        path: '',
                        loadChildren: '../welcome/welcome.module#WelcomePageModule'
                    }
                ]
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'favorite',
                children: [
                    {
                        path: '',
                        loadChildren: '../favorite/favorite.module#FavoritePageModule'
                    }
                ]
            },
            {
                path: 'borrowed-books',
                children: [
                    {
                        path: '',
                        loadChildren: '../borrowed-books/borrowed-books.module#BorrowedBooksPageModule'
                    }
                ]
            },
            {
                path: 'cart',
                children: [
                    {
                        path: '',
                        loadChildren: '../cart/cart.module#CartPageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map