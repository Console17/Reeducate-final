import type { Request, Response } from "express";
declare function getAllProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function getProductById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare const ProductService: {
    getAllProducts: typeof getAllProducts;
    createProduct: typeof createProduct;
    getProductById: typeof getProductById;
    deleteProduct: typeof deleteProduct;
    updateProduct: typeof updateProduct;
};
export {};
//# sourceMappingURL=product.service.d.ts.map