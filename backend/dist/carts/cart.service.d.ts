import type { Request, Response } from "express";
declare function getCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function addToCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function updateCartItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function removeCartItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function emptyCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const CartService: {
    getCart: typeof getCart;
    addToCart: typeof addToCart;
    updateCartItem: typeof updateCartItem;
    removeCartItem: typeof removeCartItem;
    emptyCart: typeof emptyCart;
};
export {};
//# sourceMappingURL=cart.service.d.ts.map