import type { Request, Response } from "express";
declare function checkout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function getOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function getOrderById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function updateOrderStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function deleteOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const OrderService: {
    checkout: typeof checkout;
    getOrders: typeof getOrders;
    getOrderById: typeof getOrderById;
    updateOrderStatus: typeof updateOrderStatus;
    deleteOrder: typeof deleteOrder;
};
export {};
//# sourceMappingURL=order.service.d.ts.map