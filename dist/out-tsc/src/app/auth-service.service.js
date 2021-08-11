import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var apiUrl = 'http://localhost/PHP-Slim-Restful/api/';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        console.log('Hello AuthService Provider');
    }
    AuthService.prototype.postDate = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new HttpHeaders();
            _this.http.put(apiUrl + type, JSON.stringify(credentials)).
                subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth-service.service.js.map