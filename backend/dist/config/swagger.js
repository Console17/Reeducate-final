import swaggerJSDoc from "swagger-jsdoc";
export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ecommerce",
            version: "1.0.0",
            description: "ecommerce",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        tags: [
            { name: "Auth", description: "Authentication and user session" },
            { name: "Products", description: "Product catalog" },
            { name: "Cart", description: "Shopping cart" },
            { name: "Orders", description: "Order management" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                    required: ["message"],
                },
                MessageResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                    required: ["message"],
                },
                AuthTokenResponse: {
                    type: "object",
                    properties: {
                        token: { type: "string" },
                    },
                    required: ["token"],
                },
                SignUpInput: {
                    type: "object",
                    properties: {
                        fullName: { type: "string", minLength: 3 },
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 8, maxLength: 30 },
                        age: { type: "integer", maximum: 100 },
                        role: { type: "string", enum: ["customer", "admin"] },
                    },
                    required: ["fullName", "email", "password", "age"],
                },
                SignInInput: {
                    type: "object",
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 8, maxLength: 30 },
                    },
                    required: ["email", "password"],
                },
                VerifyUserInput: {
                    type: "object",
                    properties: {
                        email: { type: "string", format: "email" },
                        otpCode: { type: "string", minLength: 6, maxLength: 6 },
                    },
                    required: ["email", "otpCode"],
                },
                ResendVerificationCodeInput: {
                    type: "object",
                    properties: {
                        email: { type: "string", format: "email" },
                    },
                    required: ["email"],
                },
                ProductCreateForm: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        quantity: { type: "integer", minimum: 0 },
                        price: { type: "number", minimum: 0 },
                        images: {
                            type: "array",
                            items: { type: "string", format: "binary" },
                        },
                    },
                    required: ["title", "description", "quantity", "price", "images"],
                },
                ProductUpdateForm: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        quantity: { type: "integer", minimum: 0 },
                        price: { type: "number", minimum: 0 },
                        images: {
                            type: "array",
                            items: { type: "string", format: "binary" },
                        },
                    },
                },
                AddToCartInput: {
                    type: "object",
                    properties: {
                        productId: { type: "string" },
                        quantity: { type: "integer", minimum: 1 },
                    },
                    required: ["productId", "quantity"],
                },
                UpdateCartItemInput: {
                    type: "object",
                    properties: {
                        quantity: { type: "integer", minimum: 1 },
                    },
                    required: ["quantity"],
                },
                UpdateOrderStatusInput: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            enum: ["preparing", "shipped", "delivered", "refunded"],
                        },
                    },
                    required: ["status"],
                },
                UserProductRef: {
                    type: "object",
                    properties: {
                        product: { type: "string" },
                        title: { type: "string" },
                        price: { type: "number" },
                    },
                    required: ["product", "title", "price"],
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        fullName: { type: "string" },
                        email: { type: "string", format: "email" },
                        age: { type: "integer" },
                        role: { type: "string", enum: ["customer", "admin"] },
                        isVerified: { type: "boolean" },
                        products: {
                            type: "array",
                            items: { $ref: "#/components/schemas/UserProductRef" },
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    required: ["_id", "fullName", "email", "age", "role", "isVerified"],
                },
                Product: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        quantity: { type: "integer" },
                        price: { type: "number" },
                        images: { type: "array", items: { type: "string" } },
                        author: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    required: ["_id", "title", "description", "quantity", "price"],
                },
                CartItem: {
                    type: "object",
                    properties: {
                        product: { $ref: "#/components/schemas/Product" },
                        quantity: { type: "integer", minimum: 1 },
                    },
                    required: ["product", "quantity"],
                },
                Cart: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        user: { type: "string" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/CartItem" },
                        },
                        totalPrice: { type: "number" },
                    },
                    required: ["items", "totalPrice"],
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        product: { $ref: "#/components/schemas/Product" },
                        title: { type: "string" },
                        price: { type: "number" },
                        quantity: { type: "integer", minimum: 1 },
                    },
                    required: ["product", "title", "price", "quantity"],
                },
                Order: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        user: { type: "string" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" },
                        },
                        totalPrice: { type: "number" },
                        status: {
                            type: "string",
                            enum: ["preparing", "shipped", "delivered", "refunded"],
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    required: ["_id", "items", "totalPrice", "status"],
                },
            },
        },
    },
    apis: ["./src/**/*.ts"],
});
//# sourceMappingURL=swagger.js.map