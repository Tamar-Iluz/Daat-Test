
export class ProductService {

    getProductsSmall() {
        return fetch('angular_react_Response.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('angular_react_Response.json').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('angular_react_Response.json').then(res => res.json()).then(d => d.data);
    }
}
     