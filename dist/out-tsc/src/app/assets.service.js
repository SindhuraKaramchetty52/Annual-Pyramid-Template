import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AssetsService = class AssetsService {
    constructor(httpclient) {
        this.httpclient = httpclient;
        this.sbus = "http://localhost:3000/sbuTable";
        this.clusters = "http://localhost:3000/clusterTable";
        this.customers = "http://localhost:3000/customerTable";
        this.components = "http://localhost:3000/componentTable";
        this.months = "http://localhost:3000/monthTable";
        this.bands = "http://localhost:3000/bandTable";
        this.annualreports = "http://localhost:3000/annualreportTable";
        this.arcs = "http://localhost:3000/arcTable";
        this.attritions = "http://localhost:3000/attritionTable";
        this.promotions = "http://localhost:3000/promotionTable";
        this.aafds = "http://localhost:3000/aafdTable";
        this.joiningpipes = "http://localhost:3000/jpTable";
    }
    getSbus() {
        return this.httpclient.get(this.sbus);
    }
    getClusters() {
        return this.httpclient.get(this.clusters);
    }
    getCustomers() {
        return this.httpclient.get(this.customers);
    }
    getComponents() {
        return this.httpclient.get(this.components);
    }
    getMonths() {
        return this.httpclient.get(this.months);
    }
    getBands() {
        return this.httpclient.get(this.bands);
    }
    getAnnualReports() {
        return this.httpclient.get(this.annualreports);
    }
    getARCs() {
        return this.httpclient.get(this.arcs);
    }
    getAttritions() {
        return this.httpclient.get(this.attritions);
    }
    getPromotions() {
        return this.httpclient.get(this.promotions);
    }
    getAAFDs() {
        return this.httpclient.get(this.aafds);
    }
    getJoiningPipes() {
        return this.httpclient.get(this.joiningpipes);
    }
};
AssetsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AssetsService);
export { AssetsService };
//# sourceMappingURL=assets.service.js.map